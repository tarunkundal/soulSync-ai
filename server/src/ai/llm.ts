import { ChatOpenAI } from "@langchain/openai";

export const llm = new ChatOpenAI({
    model: "gpt-4o-mini", // fast + cheap
    temperature: 0.8,
    apiKey: process.env.OPENAI_API_KEY!,
});
