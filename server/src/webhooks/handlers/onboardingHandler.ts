import { OnboardingStep } from "@prisma/client";
import { extractStructured } from "../../ai/llm/extract.js";
import { userNameSchema } from "../../ai/llm/schema.js";
import { prismaClient } from "../../lib/db.js";

/* =========================
   ONBOARDING HANDLER
========================= */
export async function handleOnboarding(userId: string, message: string) {
    const result = await extractStructured({
        step: "ASK_NAME",
        question: "What should I call you?",
        userMessage: message,
        schema: userNameSchema,
        formatInstructions: `{ "fullName": "string"}`,
    });

    if (!result.ok) {
        return "❌ Please provide a valid name to continue.";
    }

    await prismaClient.user.update({
        where: { id: userId },
        data: {
            fullName: result.data.fullName,
            onboardingStep: OnboardingStep.READY,
        },
    });

    return `Nice to meet you, ${result.data.fullName} 😊
            I can help you remember birthdays & send wishes automatically.
            👉 Type *Add person* to get started.`;
}