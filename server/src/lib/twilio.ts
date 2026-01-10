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
        const messageResponse = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER!,
            to: `whatsapp:${to}`,
            body: message,
        });
        console.log("WhatsApp message sent:", messageResponse);
    } catch (error) {
        console.error("Failed to send WhatsApp message:", error);
    }
}
