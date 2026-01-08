import { type Request, type Response } from "express";
import { prismaClient } from "../lib/db.js";
import {
    OnboardingStep,
    ConversationFlow,
    ConversationStep,
} from "@prisma/client";
import { sendWhatsAppMessage } from "../lib/twilio.js";

/**
 * Temporary in-memory store
 * In production, move this to Redis or DB JSON field
 */
const tempStore = new Map<
    string,
    {
        name?: string;
        phone?: string;
        relation?: string;
        date?: string;
    }
>();

export default async function whatsappWebhook(
    req: Request,
    res: Response
) {
    try {
        const from = req.body.From?.replace("whatsapp:", "");
        const message = req.body.Body?.trim();

        console.log('/webhooks/whatsapp', from, message, req);


        if (!from || !message) {
            return res.sendStatus(200);
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
            return res.sendStatus(200);
        }

        // =========================
        // 2️⃣ Onboarding flow
        // =========================
        if (user.onboardingStep !== OnboardingStep.READY) {
            const reply = await handleOnboarding(user.id, message);
            await sendWhatsAppMessage(from, reply);
            return res.sendStatus(200);
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
            return res.sendStatus(200);
        }

        if (lower === "cancel") {
            await resetConversation(user.id);
            tempStore.delete(user.id);
            await sendWhatsAppMessage(from, "❌ Action cancelled.");
            return res.sendStatus(200);
        }

        // =========================
        // 4️⃣ Conversation flow
        // =========================
        if (user.conversationFlow === ConversationFlow.ADD_PERSON) {
            const reply = await handleAddPerson(user, message);
            await sendWhatsAppMessage(from, reply);
            return res.sendStatus(200);
        }

        // =========================
        // 5️⃣ Default fallback
        // =========================
        await sendWhatsAppMessage(
            from,
            "I didn’t understand that 🤔\nType *Add person* to add someone."
        );

        res.sendStatus(200);
    } catch (error) {
        console.error("WhatsApp webhook error:", error);
        res.sendStatus(200);
    }
}

/* =========================
   ONBOARDING HANDLER
========================= */

async function handleOnboarding(userId: string, message: string) {
    const name = message.trim();

    await prismaClient.user.update({
        where: { id: userId },
        data: {
            fullName: name,
            onboardingStep: OnboardingStep.READY,
        },
    });

    return `Nice to meet you, ${name} 😊

I can help you remember birthdays & send wishes automatically.

👉 Type *Add person* to get started.`;
}

/* =========================
   ADD PERSON FLOW
========================= */

async function handleAddPerson(user: any, message: string) {
    const temp = tempStore.get(user.id) || {};

    switch (user.conversationStep) {
        case ConversationStep.ASK_PERSON_NAME:
            temp.name = message;
            tempStore.set(user.id, temp);

            await updateConversation(user.id, ConversationStep.ASK_PERSON_PHONE);
            return "Got it 👍 What’s their WhatsApp number?";

        case ConversationStep.ASK_PERSON_PHONE:
            temp.phone = message;
            tempStore.set(user.id, temp);

            await updateConversation(user.id, ConversationStep.ASK_PERSON_RELATION);
            return "How are they related to you? (friend, family, colleague)";

        case ConversationStep.ASK_PERSON_RELATION:
            temp.relation = message;
            tempStore.set(user.id, temp);

            await updateConversation(user.id, ConversationStep.ASK_PERSON_DATE);
            return "What’s the important date? (YYYY-MM-DD)";

        case ConversationStep.ASK_PERSON_DATE:
            temp.date = message;

            await updateConversation(user.id, ConversationStep.CONFIRM_PERSON);

            return `Please confirm 👇

Name: ${temp.name}
Phone: ${temp.phone}
Relation: ${temp.relation}
Date: ${temp.date}

Reply *Yes* to save or *Cancel*`;

        case ConversationStep.CONFIRM_PERSON:
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

        default:
            return "Something went wrong 🤕 Please type *Add person* again.";
    }
}

/* =========================
   HELPERS
========================= */

async function updateConversation(userId: string, step: ConversationStep) {
    await prismaClient.user.update({
        where: { id: userId },
        data: {
            conversationStep: step,
        },
    });
}

async function resetConversation(userId: string) {
    await prismaClient.user.update({
        where: { id: userId },
        data: {
            conversationFlow: ConversationFlow.NONE,
            conversationStep: ConversationStep.NONE,
        },
    });
}
