import { ChatGroq } from "@langchain/groq";
import { ChatOpenAI } from "@langchain/openai";

export const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.8,
    apiKey: process.env.OPENAI_API_KEY!,
});

export const groqModel = new ChatGroq({
    model: "openai/gpt-oss-20b",
    apiKey: process.env.GROQ_API_KEY!,
    temperature: 0,
});
