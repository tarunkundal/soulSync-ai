import type { Context } from '../context.js';
import { supabaseAdmin } from './../../lib/supabaseAdmin.js';

const queries = {
    me: async (_: any, __: any, ctx: Context) => {
        return ctx.user;
    },
}
const mutations = {
    signUp: async (
        _: any,
        { email, password }: { email: string; password: string },
        ctx: Context
    ) => {
        const { data, error } = await supabaseAdmin.auth.signUp({
            email,
            password,
        });

        if (error || !data.user) {
            throw new Error(error?.message || "Failed to register");
        }
        console.log('data for signup is ', data);

        // ✅ Login immediately if session exists
        if (data.session) {
            ctx.res.cookie("session", data.session.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
        }

        return true;
    },

    login: async (_: any, { email, password }: { email: string; password: string }, ctx: Context) => {
        const { data, error } =
            await supabaseAdmin.auth.signInWithPassword({
                email,
                password,
            });

        if (error || !data.session || !data.user) {
            throw new Error("Invalid credentials");
        }
        console.log('login server', data);

        // 🍪 Set secure cookie
        ctx.res.cookie("session", data.session.access_token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return ctx.user
    },
    logout: async (_: any, __: any, ctx: Context) => {
        ctx.res.clearCookie("session");
        return true;
    },
}

export const resolvers = { queries, mutations }
