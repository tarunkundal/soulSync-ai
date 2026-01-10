import { z } from "zod";

export const userNameSchema = z.object({
    fullName: z.string().min(1),
});

export const personNameSchema = z.object({
    name: z.string().min(1),
});

export const phoneSchema = z.object({
    phoneNumber: z.string().regex(/^\+\d{10,15}$/),
});

export const relationSchema = z.object({
    relationshipType: z.string(),
});

export const dateSchema = z.object({
    dateValue: z.string(), // YYYY-MM-DD
});
export const toneSchema = z.object({
    aiTonePreference: z.enum(["friendly", "formal", "humorous", "sentimental"]),
});