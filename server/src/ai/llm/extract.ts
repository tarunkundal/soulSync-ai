import { ChatPromptTemplate } from "@langchain/core/prompts";
import { groqModel } from "./index.js";
import type { z } from "zod";
import { log } from "console";

type ExtractResult<T> =
    | { ok: true; data: T }
    | { ok: false; reason: "INVALID_JSON" | "SCHEMA_MISMATCH" | "EMPTY" };


export async function extractStructured<T extends z.ZodTypeAny>({
    step,
    question,
    userMessage,
    schema,
    formatInstructions,
}: {
    step: string;
    question: string;
    userMessage: string;
    schema: any;
    formatInstructions: string;
}): Promise<
    | { ok: true; data: z.infer<T> }
    | { ok: false; reason: string }
> {
    const prompt = ChatPromptTemplate.fromTemplate(`
You are a strict data extraction engine.

CONVERSATION STEP:
{step}

QUESTION ASKED:
{question}

USER MESSAGE:
{message}

RULES:
- Return ONLY valid JSON
- No markdown
- No explanation
- Follow this schema exactly:
{formatInstructions}
`);

    const chain = prompt.pipe(groqModel);

    const output = await chain.invoke({
        step,
        question,
        message: userMessage,
        formatInstructions,
    });
    log("Extraction output:", output);

    const raw =
        typeof output.content === "string"
            ? output.content
            : output.content.map((b) => b.text ?? "").join("");

    let parsed;
    // try {
    //     parsed = JSON.parse(raw);
    // } catch {
    //     parsed = JSON.parse(
    //         raw.replace(/```json|```/g, "").replace(/[\u0000-\u001F]/g, "")
    //     );
    // }

    // return schema.parse(parsed);
    try {
        parsed = JSON.parse(raw);
    } catch {
        return { ok: false, reason: "INVALID_JSON" };
    }

    const result = schema.safeParse(parsed);

    if (!result.success) {
        return { ok: false, reason: "SCHEMA_MISMATCH" };
    }

    if (
        typeof parsed === "object" &&
        parsed &&
        Object.keys(parsed).length === 0
    ) {
        return { ok: false, reason: "EMPTY" };
    }

    return { ok: true, data: result.data };

}
