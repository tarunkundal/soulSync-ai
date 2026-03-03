import {
    ConversationFlow,
    ConversationStep,
    OnboardingStep,
} from "@prisma/client";
import { type Request, type Response } from "express";
import { extractStructured } from "../ai/llm/extract.js";
import { aiToneSchema, dateSchema, eventTypeSchema, personNameSchema, phoneSchema, relationSchema, userNameSchema } from "../ai/llm/schema.js";
import { prismaClient } from "../lib/db.js";
import { sendWhatsAppMessage } from "../lib/twilio.js";
import { normalizeIndianPhone, resetConversation, tempStore, updateConversation } from "./helpers/whatsappHelpers.js";

export default async function whatsappWebhook(
    req: Request,
    res: Response
) {
    try {
        const from = req.body.From?.replace("whatsapp:", "");
        const message = req.body.Body?.trim();

        console.log('/webhooks/whatsapp', from, message);

        if (!from || !message) {
            return res.sendStatus(200).end();
        }

        let user = await prismaClient.user.findUnique({
            where: { whatsappNumber: from },
        });

        // 1️⃣ New user
        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    whatsappNumber: from,
                    onboardingStep: OnboardingStep.ASK_NAME,
                },
            });

            await sendWhatsAppMessage(from, "Hey 👋 What should I call you?");
            return res.sendStatus(200).end();
        }

        // 2️⃣ Onboarding flow
        if (user.onboardingStep !== OnboardingStep.READY) {
            const reply = await handleOnboarding(user.id, message);
            await sendWhatsAppMessage(from, reply);
            return res.sendStatus(200).end();
        }

        // 3️⃣ Command handling
        const lower = message.toLowerCase();

        if (lower === "add person") {
            await prismaClient.user.update({
                where: { id: user.id },
                data: {
                    conversationFlow: ConversationFlow.ADD_PERSON,
                    conversationStep: ConversationStep.ASK_PERSON_NAME,
                },
            });

            tempStore.set(user.id, {});
            await sendWhatsAppMessage(from, "Sure 🙂 What’s the person’s name?");
            return res.sendStatus(200).end();
        }

        if (lower === "cancel") {
            await resetConversation(user.id);
            tempStore.delete(user.id);
            await sendWhatsAppMessage(from, "❌ Action cancelled. You can type *Add person* anytime.");
            return res.sendStatus(200).end();
        }

        // 4️⃣ Conversation flow
        if (user.conversationFlow === ConversationFlow.ADD_PERSON) {
            const reply = await handleAddPerson(user, message);
            await sendWhatsAppMessage(from, reply);
            return res.sendStatus(200).end();
        }

        // 5️⃣ Default fallback
        await sendWhatsAppMessage(
            from,
            "I didn’t understand that 🤔\nType *Add person* to add someone."
        );

        res.sendStatus(200).end();
    } catch (error) {
        console.error("WhatsApp webhook error:", error);
        res.sendStatus(200).end();
    }
}

/* =========================
   ONBOARDING HANDLER
========================= */
async function handleOnboarding(userId: string, message: string) {
    const result = await extractStructured({
        step: "ASK_NAME",
        question: "What should I call you?",
        userMessage: message,
        schema: userNameSchema,
        formatInstructions: `{ "fullName": "string"}`,
    });

    if (!result.ok) {
        return "❌ Please provide a valid name to continue.";
    }

    await prismaClient.user.update({
        where: { id: userId },
        data: {
            fullName: result.data.fullName,
            onboardingStep: OnboardingStep.READY,
        },
    });

    return `Nice to meet you, ${result.data.fullName} 😊
            I can help you remember birthdays & send wishes automatically.
            👉 Type *Add person* to get started.`;
}

/* =========================
   ADD PERSON FLOW
========================= */

async function handleAddPerson(user: any, message: string) {
    const temp = tempStore.get(user.id) || {};

    switch (user.conversationStep) {
        case ConversationStep.ASK_PERSON_NAME: {
            const result = await extractStructured({
                step: "ASK_PERSON_NAME",
                question: "What’s the person’s name?",
                userMessage: message,
                schema: personNameSchema,
                formatInstructions: `{ "name": "string"}`,
            });
            if (!result.ok) {
                return "❌ Please provide a valid name.";
            }
            temp.name = result.data.name;
            tempStore.set(user.id, temp);

            await updateConversation(user.id, ConversationStep.ASK_PERSON_PHONE);
            return "Please share their * WhatsApp number * 📱\n\nJust the number is fine.\nI’ll automatically add the country code if needed or you can include the *Country Code* (eg: +91)";
        }
        case ConversationStep.ASK_PERSON_PHONE: {
            const result = await extractStructured({
                step: "ASK_PERSON_PHONE",
                question: "What’s their WhatsApp number?",
                userMessage: message,
                schema: phoneSchema,
                formatInstructions: `{ "phoneNumber": "string" }`,
            });
            console.log('phone number ', result, message)

            if (!result.ok) {
                return (
                    "Sorry 😕 I couldn’t understand that.\n\n" +
                    "Please send a *10-digit WhatsApp number* (India 🇮🇳)."
                );
            }

            const phoneResult = normalizeIndianPhone(result.data.phoneNumber);

            if (!phoneResult.ok) {
                return (
                    "Hmm 🤔 that doesn’t look like a valid *WhatsApp number*.\n\n" +
                    "Please send a *10-digit mobile number*."
                );
            }

            // check if contact already exists for this user
            const already = await prismaClient.people.findFirst({
                where: { userId: user.id, phoneNumber: phoneResult.phone },
            });
            if (already) {
                await resetConversation(user.id);
                tempStore.delete(user.id);
                return (
                    "⚠️ You’ve already added someone with that WhatsApp number. " +
                    "Type *Add person* to start over with a different contact."
                );
            }

            temp.phone = phoneResult.phone;
            tempStore.set(user.id, temp);

            await updateConversation(user.id, ConversationStep.ASK_PERSON_RELATION);

            return (
                "Got it ✅\n\n" +
                "How are they related to you?\n" +
                "• *Friend*\n" +
                "• *Parent*\n" +
                "• *Partner*\n" +
                "• *Colleague*"
            );
        }
        case ConversationStep.ASK_PERSON_RELATION: {
            const result = await extractStructured({
                step: "ASK_PERSON_RELATION",
                question: "How are they related to you?",
                userMessage: message,
                schema: relationSchema,
                formatInstructions: `{ "relationshipType": "mother | father | friend | colleague | family | partner | spouse | sibling | other"}`,
            });
            if (!result.ok) {
                return "❌ Please provide a valid relationship type (friend, parent, partner, colleague).";
            }
            const { relationshipType } = result.data;
            temp.relation = relationshipType;
            tempStore.set(user.id, temp);

            await updateConversation(user.id, ConversationStep.ASK_EVENT_TYPE);
            return "Nice 👍 What kind of * event * you want to wish for ?\n\nFor example: \n• * Birthday *\n• * Anniversary *\n• * Meeting *\n• * Other *";
        }
        case ConversationStep.ASK_EVENT_TYPE: {
            const result = await extractStructured({
                step: "ASK_EVENT_TYPE",
                question: "What is the event?",
                userMessage: message,
                schema: eventTypeSchema,
                formatInstructions: `{ "eventType": "birthday | anniversary | wedding | graduation | other"}`,
            });

            if (!result.ok) {
                return "❌ Please choose one: birthday, anniversary, wedding, graduation, other.";
            }

            temp.eventType = result.data.eventType;
            tempStore.set(user.id, temp);

            await updateConversation(user.id, ConversationStep.ASK_EVENT_DATE);
            return "Got it 🎉 What’s the event date? (YYYY-MM-DD)";
        }

        case ConversationStep.ASK_EVENT_DATE: {
            const result = await extractStructured({
                step: "ASK_EVENT_DATE",
                question: "What’s the event important date?",
                userMessage: message,
                schema: dateSchema,
                formatInstructions: `{"dateValue": "YYYY-MM-DD"}`,
            });
            if (!result.ok) {
                return "❌ Please provide a valid date in YYYY-MM-DD format. Example: *1990-05-21*.";
            }
            const { dateValue } = result.data;
            temp.date = dateValue;
            await updateConversation(user.id, ConversationStep.ASK_AI_TONE);
            return "How would you like the message to sound? 😊\n\nChoose a *tone*:\n• *Warm*\n• *Funny*\n• *Formal*\n• *Emotional*\n• *Romantic*"
        }
        case ConversationStep.ASK_AI_TONE: {
            const result = await extractStructured({
                step: "ASK_AI_TONE",
                question: "How should the message sound?",
                userMessage: message,
                schema: aiToneSchema,
                formatInstructions: `{ "aiTone": "romantic | emotional | funny | professional | friendly"}`,
            });

            if (!result.ok) {
                return "❌ Choose one tone: romantic, emotional, funny, professional, friendly.";
            }

            temp.aiTone = result.data.aiTone;
            tempStore.set(user.id, temp);

            await updateConversation(user.id, ConversationStep.CONFIRM_PERSON);

            return `Please confirm 👇
                    Name: ${temp.name}
                    Phone: ${temp.phone}
                    Relation: ${temp.relation}
                    Event: ${temp.eventType}
                    Date: ${temp.date}
                    Tone: ${temp.aiTone}

                    Reply *Yes* to save or *Cancel*`;
        }

        case ConversationStep.CONFIRM_PERSON: {
            if (message.toLowerCase() !== "yes") {
                await resetConversation(user.id);
                tempStore.delete(user.id);
                return "❌ Not saved. Type *Add person* to try again.";
            }

            // make sure we don't create a duplicate entry
            const existing = await prismaClient.people.findFirst({
                where: { userId: user.id, phoneNumber: temp.phone! },
            });
            if (existing) {
                await resetConversation(user.id);
                tempStore.delete(user.id);
                return (
                    "⚠️ You already added someone with that WhatsApp number. " +
                    "Type *Add person* to try again with a different contact."
                );
            }

            try {
                await prismaClient.people.create({
                    data: {
                        name: temp.name!,
                        phoneNumber: temp.phone!,
                        relationshipType: temp.relation!,
                        aiTonePreference: temp.aiTone!,
                        userId: user.id,
                        importantDates: {
                            create: {
                                dateType: temp.eventType!.toUpperCase(),
                                dateValue: new Date(temp.date!),
                            },
                        },
                    },
                });
            } catch (err: any) {
                // catch unique constraint just in case our pre-check missed it
                if (
                    err?.code === "P2002" &&
                    err?.meta?.target?.includes("phone_number")
                ) {
                    await resetConversation(user.id);
                    tempStore.delete(user.id);
                    return (
                        "⚠️ That contact already exists for your account. " +
                        "Type *Add person* if you want to add somebody else."
                    );
                }
                throw err;
            }

            await resetConversation(user.id);
            tempStore.delete(user.id);

            return "✅ Person added successfully! 🎉";
        }
        default:
            return "Something went wrong 🤕 Please type *Add person* again.";
    }
}