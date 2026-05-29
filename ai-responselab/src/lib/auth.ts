import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaDb } from "./db";
import { env } from "./env";
export const auth = betterAuth({
    database: prismaAdapter(prismaDb, {
        provider: "postgresql",
    }),
    socialProviders:{
        github:{
            clientId:env.GITHUB_CLIENTID,
            clientSecret:env.GITHUB_CLIENT_SECRET
        },
        google:{
            clientId:env.GOOGLE_CLIENTID,
            clientSecret:env.GOOGLE_CLIENT_SECRET
        },
    }
});