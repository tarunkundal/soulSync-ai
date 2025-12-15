import "dotenv/config";

import { expressMiddleware } from '@as-integrations/express4';
import express, { type Application, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { env } from "process";
import cors from "cors";
import createGraphqlApolloServer from './graphql/index.js';
import { createContext } from './graphql/context.js';

async function init() {
    const app: Application = express()
    const PORT = Number(env.PORT) || 4000

    app.use(cookieParser());
    app.use(express.json())

    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );

    app.get("/auth/callback", async (_req, res) => {
        // Just redirect to frontend callback page
        res.redirect("http://localhost:3000/auth/callback");
    });


    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World!')
    })

    const gqlServer = await createGraphqlApolloServer()

    app.use("/graphql", expressMiddleware(gqlServer, {
        context: createContext
    }))

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

init()