import { ChatPromptTemplate } from "@langchain/core/prompts";
import { groqModel } from "./index.js";

type GenerateEventMessageInput = {
    senderName: string;
    receiverName: string;
    relation: string;
    eventType: string;
    tone: string;
    language?: string;
};

export async function generateEventMessage({
    senderName,
    receiverName,
    relation,
    eventType,
    tone,
    language = "en",
}: GenerateEventMessageInput): Promise<string> {
    const prompt = ChatPromptTemplate.fromTemplate(`
You are an thoughtful assistant that writes short beautifull WhatsApp messages.

CONTEXT:
- Event: {eventType}
- Tone: {tone}
- Language: {language}

SENDER:
{senderName}

RECEIVER:
{receiverName} ({relation})

RULES:
- Max 40 words
- Friendly and natural WhatsApp style
- No hashtags
- No emojis overload (0–2 emojis max)
- No quotes, no signatures
- Output only the message text
`);

    const chain = prompt.pipe(
        groqModel.withConfig({
            temperature: 0.7,
        })
    );

    const response = await chain.invoke({
        senderName,
        receiverName,
        relation,
        eventType,
        tone,
        language,
    });

    return extractText(response).trim();
}

/* =========================
   HELPERS
========================= */

function extractText(response: any): string {
    if (typeof response?.content === "string") {
        return response.content;
    }

    if (Array.isArray(response?.content)) {
        return response.content
            .map((block: { text: any; }) =>
                typeof block === "string"
                    ? block
                    : block?.text ?? ""
            )
            .join("");
    }

    return "";
}
