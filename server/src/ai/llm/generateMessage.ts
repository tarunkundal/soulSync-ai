import { ChatPromptTemplate } from "@langchain/core/prompts";
import { groqModel } from "./index.js";

export async function generateEventMessage({
    senderName,
    receiverName,
    relation,
    eventType,
    tone,
    language = "en",
}: {
    senderName: string;
    receiverName: string;
    relation: string;
    eventType: string;
    tone: string;
    language?: string;
}) {
    const prompt = ChatPromptTemplate.fromTemplate(`
Write a {tone} {eventType} message.

From: {senderName}
To: {receiverName}
Relation: {relation}
Language: {language}

Rules:
- Max 40 words
- Natural WhatsApp style
- No emojis overload
`);

    const chain = prompt.pipe(
        groqModel.withConfig({ temperature: 0.7 })
    );

    const res = await chain.invoke({
        senderName,
        receiverName,
        relation,
        eventType,
        tone,
        language,
    });

    return typeof res.content === "string"
        ? res.content
        : res.content.map((b) => b.text).join("");
}
