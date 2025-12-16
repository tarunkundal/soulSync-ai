import { prismaClient } from "../../lib/db.js";
import type { Context } from "../context.js";
import type { MutationResolvers, QueryResolvers } from "../generated/serverTypes.js";

const queries: QueryResolvers = {}
const mutations: MutationResolvers = {
    createPerson: async (_: any, { input }, ctx: Context) => {
        const user_id = ctx.user?.id
        const people = await prismaClient.people.create({
            data: {
                name: input.name,
                relationshipType: input.relationshipType,
                userId: user_id!,
                aiTonePreference: input.aiTonePreference,
                phoneNumber: input.phoneNumber,
                importantDates: {
                    create: {
                        dateValue: input.date,
                        dateType: 'birthday'
                    }
                }

            },
            include: { importantDates: true }
        })
        console.log('crete user data', people)
        return people
    }
}

export const resolvers = { queries, mutations }