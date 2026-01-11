import { ConversationFlow, ConversationStep } from "@prisma/client";
import { prismaClient } from "../../lib/db.js";

export async function updateConversation(userId: string, step: ConversationStep) {
    await prismaClient.user.update({
        where: { id: userId },
        data: {
            conversationStep: step,
        },
    });
}

export async function resetConversation(userId: string) {
    await prismaClient.user.update({
        where: { id: userId },
        data: {
            conversationFlow: ConversationFlow.NONE,
            conversationStep: ConversationStep.NONE,
        },
    });
}

/**
 * Temporary in-memory store
 * In production, move this to Redis or DB JSON field
 */
export const tempStore = new Map<
    string,
    {
        name?: string;
        phone?: string;
        relation?: string;
        eventType?: string;
        date?: string;
        aiTone?: string;
    }
>();

export function normalizeIndianPhone(input: string): {
    ok: true;
    phone: string;
} | {
    ok: false;
    reason: string;
} {
    const digits = input.replace(/\D/g, "");

    // Remove country code if user typed it
    let local = digits;

    if (digits.startsWith("91") && digits.length === 12) {
        local = digits.slice(2);
    }

    if (local.length !== 10) {
        return {
            ok: false,
            reason: "Phone number must be exactly 10 digits",
        };
    }

    return {
        ok: true,
        phone: `+91${local}`,
    };
}


