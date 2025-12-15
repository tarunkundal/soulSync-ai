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

    login: async (_: any, { email, password }: { email: string, password: string }, ctx: Context) => {
        const { data, error } =
            await supabaseAdmin.auth.signInWithPassword({
                email,
                password,
            });

        if (error || !data.session || !data.user) {
            throw new Error("Invalid credentials");
        }

        ctx.res.cookie("session", data.session.access_token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        // ✅ fetch DB user manually
        const dbUser = await ctx.prisma.user.findUnique({
            where: { id: data.user.id },
        });

        return dbUser;
    },

    logout: async (_: any, __: any, ctx: Context) => {
        ctx.res.clearCookie("session");
        return true;
    },
    setSession: async (
        _: any,
        { token }: { token: string },
        ctx: Context
    ) => {
        ctx.res.cookie("session", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return true;
    },
    googleAuthUrl: async () => {
        const { data, error } = await supabaseAdmin.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:4000/auth/callback",
            },
        });

        if (error || !data.url) {
            throw new Error("Failed to initiate Google login");
        }

        return data.url;
    }

}

export const resolvers = { queries, mutations }
