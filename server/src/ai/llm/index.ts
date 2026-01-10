import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";

export const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.8,
    apiKey: process.env.OPENAI_API_KEY!,
});

export const groqModel = new ChatGroq({
    model: "llama-3.1-8b-instant",
    apiKey: process.env.GROQ_API_KEY!,
    temperature: 0,
});
