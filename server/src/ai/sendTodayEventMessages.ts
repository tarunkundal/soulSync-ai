import { prismaClient } from "../lib/db.js";
import { sendWhatsAppMessage } from "../lib/twilio.js";
import { getTodayPendingEvents } from "./fetchTodayEvents.js";
import { generateEventMessage } from "./llm/generateMessage.js";

export async function sendTodayEventMessages() {
    const events = await getTodayPendingEvents();

    for (const event of events) {
        const person = event.people;
        const user = person.user;

        // ❌ Skip if WhatsApp not enabled or phone missing
        if (!person.phoneNumber) {
            continue;
        }

        // 🧠 Generate event message
        const message = await generateEventMessage({
            senderName: user.fullName ?? "Someone special",
            receiverName: person.name,
            relation: person.relationshipType,
            eventType: event.dateType,
            tone: person.aiTonePreference,
        });

        console.log("Generated message:", message);

        try {
            // 📤 Send WhatsApp
            await sendWhatsAppMessage(person.phoneNumber, message);

            // ✅ Store SENT message
            await prismaClient.messages.create({
                data: {
                    content: message,
                    style: person.aiTonePreference,
                    status: "SENT",
                    messageLength: message.length,
                    personId: person.id,
                    userId: user.id,
                },
            });
            console.log("WhatsApp message sent successfully to", person.phoneNumber);
        } catch (error) {
            console.error("Failed to send WhatsApp message:", error);

            // // ❌ Store FAILED message
            await prismaClient.messages.create({
                data: {
                    content: message,
                    style: person.aiTonePreference,
                    status: "FAILED",
                    messageLength: message.length,
                    personId: person.id,
                    userId: user.id,
                },
            });
        }
    }
}
