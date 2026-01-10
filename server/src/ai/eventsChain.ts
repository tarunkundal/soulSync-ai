import { ChatPromptTemplate } from "@langchain/core/prompts";
import { llm } from "./llm/index.js";

const prompt = ChatPromptTemplate.fromTemplate(`
You are a thoughtful assistant who writes short WhatsApp messages.

Write a {tone} birthday message for {name}.
Keep it warm, friendly, and under 40 words.
`);

export async function generateBirthdayMessage({
    name,
    tone,
}: {
    name: string;
    tone: string;
}) {
    const chain = prompt.pipe(llm);
    const response = await chain.invoke({ name, tone });

    return response.content.toString();
}


