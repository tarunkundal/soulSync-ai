import { prismaClient } from "../../lib/db.js";
import type { Context } from "../context.js";
import type { MutationResolvers, QueryResolvers } from "../generated/serverTypes.js";

const queries: QueryResolvers = {
    getAllPeople: async (_: any, __: any, ctx: Context) => {
        const user_id = ctx.user?.id ?? "4bf53225-e061-4ea0-ad03-2e999d1a911f"
        if (!user_id) {
            throw new Error("Unauthorized");
        }
        const people = await prismaClient.people.findMany({
            where: { userId: user_id },
            include: { importantDates: true }
        })
        return { people }
    },
    getPersonDetails: async (_: any, { personId }, ctx: Context) => {
        const user_id = ctx.user?.id ?? "4bf53225-e061-4ea0-ad03-2e999d1a911f"
        if (!user_id) {
            throw new Error("Unauthorized");
        }
        const person = await prismaClient.people.findFirst({
            where: { id: personId, userId: user_id },
            include: { importantDates: true }
        })
        if (!person) {
            throw new Error("Person not found");
        }
        return { person }
    }
}

const mutations: MutationResolvers = {
    createPerson: async (_: any, { input }, ctx: Context) => {
        const user_id = ctx.user?.id ?? "4bf53225-e061-4ea0-ad03-2e999d1a911f"
        const people = await prismaClient.people.create({
            data: {
                name: input.name,
                relationshipType: input.relationshipType,
                userId: user_id!,
                aiTonePreference: input.aiTonePreference,
                phoneNumber: input.phoneNumber,
                whatsappEnabled: input.whatsappEnabled!,
                importantDates: {
                    create: {
                        dateValue: input.importantDates.dateValue,
                        dateType: input.importantDates.dateType
                    }
                }
            },
            include: { importantDates: true }
        })
        console.log('crete user data', people)
        return people
    },
    addNewImportantDate: async (_: any, { input }, ctx: Context) => {
        const importantDate = await prismaClient.important_Dates.create({
            data: {
                dateValue: input.dateValue,
                dateType: input.dateType,
                people: {
                    connect: {
                        id: input.personId
                    }
                }
            }
        })
        return importantDate
    }
}

export const resolvers = { queries, mutations }