import { generateBirthdayMessage } from "../ai/eventsChain.js";
import { prismaClient } from "../lib/db.js";
import { sendWhatsAppMessage } from "../lib/twilio.js";

export async function sendBirthdayWishes() {
    const today = new Date();

    const people = await prismaClient.important_Dates.findMany({
        where: {
            dateType: "BIRTHDAY",
            dateValue: today,
        },
        include: {
            people: true,
        },
    });

    for (const entry of people) {
        const person = entry.people;

        const message = await generateBirthdayMessage({
            name: person.name,
            tone: person.aiTonePreference || "friendly",
        });

        await sendWhatsAppMessage(person.phoneNumber!, message);

        await prismaClient.messages.create({
            data: {
                content: message,
                style: "birthday",
                status: "sent",
                messageLength: message.length,
                personId: person.id,
                userId: person.userId,
            },
        });
    }
}
