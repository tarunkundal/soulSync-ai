import Twilio from "twilio";

const client = Twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
);

export async function sendWhatsAppMessage(
    to: string,
    message: string
) {
    try {
        await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER!,
            to: `whatsapp:${to}`,
            body: message,
        });
    } catch (error) {
        console.error("Failed to send WhatsApp message:", error);
    }
}
