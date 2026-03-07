import {
    ConversationFlow,
    ConversationStep,
    OnboardingStep,
} from "@prisma/client";
import { type Request, type Response } from "express";
import { prismaClient } from "../lib/db.js";
import { sendWhatsAppMessage } from "../lib/twilio.js";
import { handleAddPerson } from "./handlers/addPersonHandler.js";
import { handleOnboarding } from "./handlers/onboardingHandler.js";
import { resetConversation, tempStore } from "./helpers/whatsappHelpers.js";
import { transcribeAudio } from "./utils/transcription.js";

export default async function whatsappWebhook(
    req: Request,
    res: Response
) {
    try {
        const from = req.body.From?.replace("whatsapp:", "");
        let message = req.body.Body?.trim();

        console.log('/webhooks/whatsapp', from, message);

        const numMedia = parseInt(req.body.NumMedia || "0", 10);
        if (numMedia > 0 && req.body.MediaContentType0?.startsWith('audio/')) {
            const audioUrl = req.body.MediaUrl0;
            try {
                message = await transcribeAudio(audioUrl);
                console.log('Transcribed message:', message);
                if (!message || message.trim() === '') {
                    await sendWhatsAppMessage(from, "Sorry, I couldn't understand your voice note. Please try again or send a text message.");
                    return res.sendStatus(200).end();
                }
            } catch (error) {
                console.error('Transcription error:', error);
                await sendWhatsAppMessage(from, "Sorry, I couldn't process your voice note. Please send a text message instead.");
                return res.sendStatus(200).end();
            }
        }

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
