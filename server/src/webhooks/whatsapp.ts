import {
    ConversationFlow,
    ConversationStep,
    OnboardingStep,
} from "@prisma/client";
import { type Request, type Response } from "express";
import { extractStructured } from "../ai/llm/extract.js";
import { dateSchema, personNameSchema, phoneSchema, relationSchema, userNameSchema } from "../ai/llm/schema.js";
import { prismaClient } from "../lib/db.js";
import { sendWhatsAppMessage } from "../lib/twilio.js";
import { normalizePhone, resetConversation, tempStore, updateConversation } from "./helpers/whatsappHelpers.js";

export default async function whatsappWebhook(
    req: Request,
    res: Response
) {
    try {
        const from = req.body.From?.replace("whatsapp:", "");
        const message = req.body.Body?.trim();

        console.log('/webhooks/whatsapp', from, message);


        if (!from || !message) {
            return res.sendStatus(200).send();
        }

        let user = await prismaClient.user.findUnique({
            where: { whatsappNumber: from },
        });

        // =========================
        // 1️⃣ New user
        // =========================
        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    whatsappNumber: from,
                    onboardingStep: OnboardingStep.ASK_NAME,
                },
            });

            await sendWhatsAppMessage(from, "Hey 👋 What should I call you?");
            return res.sendStatus(200).send();
        }

        // =========================
        // 2️⃣ Onboarding flow
        // =========================
        if (user.onboardingStep !== OnboardingStep.READY) {
            const reply = await handleOnboarding(user.id, message);
            await sendWhatsAppMessage(from, reply);
            return res.sendStatus(200).send();
        }

        // =========================
        // 3️⃣ Command handling
        // =========================
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
            return res.sendStatus(200).send();
        }

        if (lower === "cancel") {
            await resetConversation(user.id);
            tempStore.delete(user.id);
            await sendWhatsAppMessage(from, "❌ Action cancelled. You can type *Add person* anytime.");
            return res.sendStatus(200).send();
        }

        // =========================
        // 4️⃣ Conversation flow
        // =========================
        if (user.conversationFlow === ConversationFlow.ADD_PERSON) {
            const reply = await handleAddPerson(user, message);
            await sendWhatsAppMessage(from, reply);
            return res.sendStatus(200).send();
        }

        // =========================
        // 5️⃣ Default fallback
        // =========================
        await sendWhatsAppMessage(
            from,
            "I didn’t understand that 🤔\nType *Add person* to add someone."
        );

        res.sendStatus(200).send();
    } catch (error) {
        console.error("WhatsApp webhook error:", error);
        res.sendStatus(200).send();
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
            return "Got it 👍 What’s their WhatsApp number? Please include the *Country Code* (eg: +91)";
        }
        case ConversationStep.ASK_PERSON_PHONE: {
            const result = await extractStructured({
                step: "ASK_PERSON_PHONE",
                question: "What’s their WhatsApp number?",
                userMessage: message,
                schema: phoneSchema,
                formatInstructions: `{ "phoneNumber": "+911234567890"}`,
            });
            if (!result.ok) {
                return "❌ Please provide a valid phone number with country code. Example: *+919876543210*.";
            }
            const { phoneNumber } = result.data;
            const normalizedPhone = normalizePhone(phoneNumber);

            if (!normalizedPhone) {
                return "❌ Please enter a valid WhatsApp number. Example: *9876543210* or *+919876543210*.";
            }
            temp.phone = normalizedPhone;
            tempStore.set(user.id, temp);

            await updateConversation(user.id, ConversationStep.ASK_PERSON_RELATION);
            return "How are they related to you? (friend, family, colleague)";
        }
        case ConversationStep.ASK_PERSON_RELATION: {
            const result = await extractStructured({
                step: "ASK_PERSON_RELATION",
                question: "How are they related to you?",
                userMessage: message,
                schema: relationSchema,
                formatInstructions: `{ "relationshipType": "mother | father | friend | colleague | family"}`,
            });
            if (!result.ok) {
                return "❌ Please provide a valid relationship type (friend, family, colleague).";
            }
            const { relationshipType } = result.data;
            temp.relation = relationshipType;
            tempStore.set(user.id, temp);

            await updateConversation(user.id, ConversationStep.ASK_PERSON_DATE);
            return "What’s the important date? (YYYY-MM-DD)";
        }
        case ConversationStep.ASK_PERSON_DATE: {
            const result = await extractStructured({
                step: "ASK_PERSON_DATE",
                question: "What’s the important date?",
                userMessage: message,
                schema: dateSchema,
                formatInstructions: `{"dateValue": "YYYY-MM-DD"}`,
            });
            if (!result.ok) {
                return "❌ Please provide a valid date in YYYY-MM-DD format. Example: *1990-05-21*.";
            }
            const { dateValue } = result.data;
            temp.date = dateValue;
            await updateConversation(user.id, ConversationStep.CONFIRM_PERSON);

            return `Please confirm 👇
                    Name: ${temp.name}
                    Phone: ${temp.phone}
                    Relation: ${temp.relation}
                    Date: ${temp.date}

                    Reply *Yes* to save or *Cancel*`;
        }
        case ConversationStep.CONFIRM_PERSON: {
            if (message.toLowerCase() !== "yes") {
                await resetConversation(user.id);
                tempStore.delete(user.id);
                return "❌ Not saved. Type *Add person* to try again.";
            }

            await prismaClient.people.create({
                data: {
                    name: temp.name!,
                    phoneNumber: temp.phone!,
                    relationshipType: temp.relation!,
                    aiTonePreference: "friendly",
                    userId: user.id,
                    importantDates: {
                        create: {
                            dateType: "BIRTHDAY",
                            dateValue: new Date(temp.date!),
                        },
                    },
                },
            });

            await resetConversation(user.id);
            tempStore.delete(user.id);

            return "✅ Person added successfully! 🎉";
        }
        default:
            return "Something went wrong 🤕 Please type *Add person* again.";
    }
}


