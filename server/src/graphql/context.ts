import { prismaClient as prisma } from './../lib/db.js';
import { type Request, type Response } from "express";
import { supabaseAdmin } from "../lib/supabaseAdmin.js";

export const createContext = async ({
    req,
    res,
}: {
    req: Request;
    res: Response;
}) => {
    const token = req.cookies.session;

    if (!token) {
        return { user: null, prisma, req, res };
    }

    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data.user) {
        return { user: null, prisma, req, res };
    }

    const dbUser = await prisma.user.findUnique({
        where: { id: data.user.id },
    });

    return {
        user: dbUser, // Supabase user
        prisma,
        req,
        res,
    };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
