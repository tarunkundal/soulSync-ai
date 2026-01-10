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
        date?: string;
    }
>();

export function normalizePhone(input: string): string | null {
    const cleaned = input.replace(/[^\d+]/g, "");

    if (cleaned.startsWith("+")) {
        return cleaned;
    }

    // assume India
    if (cleaned.length >= 10) {
        return `+91${cleaned.slice(-10)}`;
    }

    return null;
}

export const MONTHS: Record<string, number> = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11,
};

export function normalizeDate(input: string): Date | null {
    const now = new Date();
    let day: number | null = null;
    let month: number | null = null;
    let year: number | null = null;

    const text = input.toLowerCase().replace(/,/g, "").trim();

    // yyyy-mm-dd
    const isoMatch = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (isoMatch) {
        year = Number(isoMatch[1]);
        month = Number(isoMatch[2]) - 1;
        day = Number(isoMatch[3]);
    }

    // dd/mm or dd-mm
    const shortMatch = text.match(/^(\d{1,2})[\/\-](\d{1,2})$/);
    if (!year && shortMatch) {
        day = Number(shortMatch[1]);
        month = Number(shortMatch[2]) - 1;
        year = now.getFullYear();
    }

    // 20 january / january 20
    if (!month) {
        const parts = text.split(" ");
        for (const p of parts) {
            if (MONTHS[p] !== undefined) month = MONTHS[p];
            if (!isNaN(Number(p))) day = Number(p);
        }
        year = year ?? now.getFullYear();
    }

    if (day === null || month === null || year === null) return null;

    const date = new Date(year, month, day);

    // if date already passed → next year
    if (date < now) {
        date.setFullYear(year + 1);
    }

    return date;
}
