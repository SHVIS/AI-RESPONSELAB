### This project is based on similar work of postman that more then it not only reposne -req but a mixed version of ai suggested where it  teach about each fetchs recommandations, and many more so Stay Tuned for Updates TechStack Used #nextjs15 #tailwindcss #shadcn #aisdk

# AI Response Lab 🚀

A Smart API Testing + AI Suggestion Platform
Inspired by Postman but not just request-response stuff.

This project is based on similar work like Postman but little more than that.
Not only API request/response handling, but also a mixed version with AI suggestions where it teaches about each fetch request, recommendations, explanations, debugging help and many more things.

So basically instead of only testing APIs, I want this project to also help beginners understand what they are doing.

Still building...
Stay Tuned for Updates 😅

## Tech Stack Used

* Next.js 15
* Tailwind CSS
* Shadcn UI
* AI SDK
* Prisma
* PostgreSQL
* Docker
* Better Auth

---

# Objective 1 — Project Setup

Started with base setup of frontend and UI.

## Step 1 — Create Next.js App

```bash
npx create-next-app@15
```

This initializes the Next.js 15 project.

---

## Step 2 — Setup Shadcn UI

```bash
npx shadcn@latest init
```

During setup:

* choose the theme
* configure aliases
* setup tailwind automatically

Then add components:

```bash
npx shadcn@latest add
```

You can:

* add individual components
* or install many together

In Shadcn it installs all the components under:

```txt
src/components/ui
```

which is actually nice because everything remains organized.

---

# Objective 2 — Database Setup + Better Auth

Now backend/database setup started.

This part honestly took WAY more time than expected 😭

---

# Prisma Setup

## Install Prisma

```bash
npm i prisma @prisma/client
```

---

## Initialize Prisma

```bash
npx prisma init
```

This creates:

* Prisma folder
* schema.prisma
* .env file

Inside `.env` it gives database URL placeholder automatically.

---

# Prisma Schema Notes

Inside Prisma schema generator:

```prisma
generator client {
  provider = "prisma-client"
  //output   = "../src/generated/prisma"
}
```

In this schema/prisma client we removed output object thing because default generation was enough for current setup.

---

# Why Docker Instead of Neon DB?

Initially I thought of using Neon DB.

But sometimes cloud databases become slower or sleep after inactivity.

So instead we use Docker container for PostgreSQL.

This way:

* DB runs locally
* Faster development
* More control
* No internet dependency
* No free-tier limitations

---

# What Actually is Docker? (Beginner Understanding)

A Docker Container is basically a lightweight isolated environment.

It includes:

* application code
* runtime
* dependencies
* everything needed to run app

So instead of installing PostgreSQL directly in Windows manually, Docker runs it in isolated container.

Honestly cleaner approach.

---

# Basic Dockerfile Example

```Dockerfile
# 1. Base image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy files
COPY package*.json ./

RUN npm install

COPY . .

# 4. Start app
CMD ["npm", "start"]
```

---

# Docker Compose Setup

We created:

```txt
docker-compose.yml
```

This file is responsible for docker configurations.

It defines:

* services
* ports
* volumes
* database container
* environment variables

Basically whole multi-container setup.

---

# Docker Desktop Setup (Windows Pain Section 😭)

Truly Docker setup itself took me 3hr+ on Windows.

Totally worse experience initially.

## Problems Faced

### Problem 1 — Windows Version

Needed:

* Windows version `19045+`
* WSL support

Older version required upgrades first.

---

### Problem 2 — WSL Setup

Docker Desktop depends heavily on:

```txt
WSL = Windows Subsystem for Linux
```

So had to install WSL first.

Initially installed Ubuntu but it was large and connection issues started happening.

Then:

* internet slowdown
* installation retry
* WSL upgrade
* restart PC
* Docker still not opening

Total chaos 😂

---

### Problem 3 — Debian Not Connecting

I installed Debian manually first.

But it was not connecting properly because of `.exe` related issue.

Finally fixed using:

```bash
wsl --install debian
```

instead of manual setup.

---

# Final Docker Success 🎉

After:

* reinstalling Docker Desktop
* restarting multiple times
* retrying setup
* fixing docker-compose config

Finally it worked around evening 😭

Then:

```bash
docker-compose up
```

worked successfully.

---

# Package.json Automation

Added script inside `package.json`

```json
"devdocker": "docker-compose up -d && next dev --turbopack"
```

Now whenever I run:

```bash
npm run devdocker
```

It:

1. Starts PostgreSQL container
2. Runs Next.js app

Super useful.

---

# Environment Variable Setup

Inside `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

This connects Prisma with PostgreSQL container.

---

# Running Development Setup

## Command

```bash
npm run devdocker
```

### What this does

Because package script already contains:

```bash
docker-compose up -d && next dev --turbopack
```

it:

* launches Docker PostgreSQL container
* starts Next.js dev server

---

# Output Example

```powershell
> ai-responselab@0.1.0 devdocker
> docker-compose up -d && next dev --turbopack

[+] up 1/1
 ✔ Container ai-responselab-db-1 Started                                                                  1.1s

▲ Next.js 15.5.14 (Turbopack)

- Local:        http://localhost:3000
```

At this point project + database both were running correctly 🎉

---

# Testing Prisma Migration

Now needed to test whether Prisma actually connects properly or not.

So created demo schema.

---

# Test Schema

```prisma
generator client {
  provider = "prisma-client"
}

datasource db {
  provider = "postgresql"
}

model Test {
  id String @id @default(cuid())
  name String
}
```

---

# Run Migration

## Step 1

Run development environment first:

```bash
npm run devdocker
```

---

## Step 2

Run migration:

```bash
npx prisma migrate dev
```

Then Prisma asks migration name.

Entered:

```txt
test
```

Hit enter.

---

# Migration Generated Successfully

It generated migration SQL file automatically.

```sql
-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);
```

At this point confirmed:

* Prisma working
* PostgreSQL working
* Docker working
* Migration pipeline working

Big relief honestly 😭

---

# Better Auth Setup

In current project we are using Better Auth for authentication.

Including:

* Google authentication
* session management
* auth handling

---

# Install Better Auth

```bash
npm i better-auth
```

---

# Environment Variables

Inside `.env`

```env
BETTER_AUTH_SECRET=SECRET--$-HASH
BETTER_AUTH_URL=http://localhost:3000
```

---

## About `BETTER_AUTH_SECRET`

This is used for:

* encryption
* hashing
* session security

It should:

* be at least 32 characters
* contain high entropy/randomness

---

# Better Auth Instance

Create:

```txt
auth.ts
```

inside proper project location.

This file initializes Better Auth instance.

---

# Current Architecture Overview

Current setup looks something like this:

```txt
Next.js App
   ↓
Better Auth
   ↓
Prisma Client
   ↓
PostgreSQL (Docker Container)
```

---

# Current Progress Status

## ✅ Objective 1 Completed

* Next.js setup
* Tailwind setup
* Shadcn setup

## ✅ Objective 2 Completed

* Prisma setup
* PostgreSQL setup
* Docker setup
* Migration testing
* Better Auth installation

feat : Br_2_with_Objective 1 & 2


# Type-Safe `.env` Setup
Now a Days We Can Create a Validation for Env file Using a lib 

In current project we also make type-safe `.env` handling so there is less chance of environment variable errors.

Created under:
```bash
- > npm i @t3-oss/env-nextjs // libery for env file type safety
``` 
```txt
lib/env
```
Reason:
Sometimes typo in env variable names creates silent bugs and debugging becomes painful.

So making type-safe env handling is actually worth it.
---
---
## ✅ Objective 3 Completed
 Authentication Integration (Github,OAuth(Google))
 - > add GitHub Server & Client Secerts
  - >create Google/Github OAuth app
  - > Add .env Files 
  - > add api End Point
- > add Server & Client Auth Config
- > better Auth Integration  (😥tough part )
- > add Users Actions in Authentications

# generate OAuth Client ID N Secrets from (Google N Github)
# OAuth Setup (Better Auth)

  ### 1. Create OAuth App (Google)
  - Go to Google Cloud Console: https://console.cloud.google.com/
  - Create a new project
  - Go to **APIs & Services → OAuth consent screen**
  - Configure:
    - App name
    - Support email
    - Developer email
  - Go to **Credentials → Create Credentials → OAuth Client ID**
  - Choose:
    - Application type: Web application
  - Add redirect URI:
    - http://localhost:3000/api/auth/callback/google
    - https://your-domain.com/api/auth/callback/google
  - Copy:
    - Client ID
    - Client Secret

  ---

  ### 2. Create OAuth App (GitHub)
  - Go to GitHub Settings: https://github.com/settings/developers
  - Click **OAuth Apps → New OAuth App**
  - Fill:
    - Application name
    - Homepage URL
    - Authorization callback URL:
      - http://localhost:3000/api/auth/callback/github
  - Copy:
    - Client ID
    - Client Secret

  ---

  ### 3. Environment Variables (.env)

  ```env
  GOOGLE_CLIENT_ID=your_google_client_id
  GOOGLE_CLIENT_SECRET=your_google_client_secret

  GITHUB_CLIENT_ID=your_github_client_id
  GITHUB_CLIENT_SECRET=your_github_client_secret

  BETTER_AUTH_SECRET=your_random_secret 
  ```
  ---

# add Server & Client Config 

### Server config in auth.ts
```js 
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
```
### Client Config in auth-client.ts or End Point
Now we can Eaisly Use This any where 
export const authClient = createAuthClient({
    baseURL:"http://localhost:3000"
});

example
# Module 3 — Better Auth Schema Generation
What `npx @better-auth/cli generate` actually does
Initially, I assumed the command would directly create database tables.

In reality:
```console
Better Auth Config
        ↓
CLI Reads Config
        ↓
Detects Prisma Adapter
        ↓
Generates Auth Models
        ↓
Updates schema.prisma 
```

# Global Varible (Compulasory and Got Critical Err in v7 Primsa) Module 4 — Prisma + Better Auth Challenge
Most Time-Consuming Issue

This was easily the toughest part of the authentication setup.

I spent nearly 2–3 days debugging issues related to:

- Prisma Client
- Better Auth
- Global Prisma Instance (db.ts)
- Prisma v7 compatibility

The issue was specifically around using the global Prisma instance together with Better Auth.

I even opened a GitHub issue while investigating the problem.
->>![https://github.com/prisma/prisma/issues/29590] and Linkedin Post Realted It.
Resolution

Installing and configuring the PostgreSQL adapter solved the issue:
```
- >npm install @prisma/adapter-pg pg


# my error Finally Resolve By using adapter of @prisma/adapter-pg package configuration
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
})
export const prisma = globalForPrisma.prisma ||
  new PrismaClient(
    { adapter }
  );
```
### After Finally Execution
  - CLI detects Better Auth configuration
 -  Prompts to overwrite schema.prisma
  - Generates authentication models
 -  Updates Prisma schema
 - We Got a auth Schema.primsa with a schema of User and Admin 
1. Generate Better Auth Schema
> npx @better-auth/cli generate
This updated:prisma/schema.prisma and generated auth models (User, Session, Account, Verification, etc.).

# Professional Production Workflow

Recommended production flow:

```bash
# generate prisma client
npx prisma generate

# generate auth schema
npx @better-auth/cli generate

#Reset or Do a fresh migrations 
npx prisma migrate reset 
# Create Database create migrations /migrations
npx prisma migrate dev

# regenerate client
npx prisma generate
```

# Creating User Actions

## `currentUser()` Action

A reusable server-side action used to fetch the currently authenticated user's information.

### Responsibilities

* Read the current session using Better Auth
* Verify the user is authenticated
* Fetch the latest user data from Prisma
* Return selected user fields
* Handle errors safely

### Flow

```txt
Request Headers
      ↓
Better Auth Session
      ↓
Validate User
      ↓
Prisma Query
      ↓
Return User Data
```

```ts
"use server"
import { auth } from "@/lib/auth";
import { prismaDb } from "@/lib/db";
import { headers } from "next/headers";
export const currentUser = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) return null;
        const user = await prismaDb.user.findUnique({
            where: { id: session?.user?.id },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return user;
    }
    catch (err) {
        console.error("Error while Fetching Current User : ", err);
        return null;
    }
}
``` 
## Usage Exmapl
```ts
import { currentUser } from "@/modules/actions";
export default async function Home() {
  const user = await currentUser(); 
  return (<UserButton user={user} />)}
```
### Why Use It?

Instead of repeating authentication and database logic throughout the application, this action provides a single source for retrieving the current logged-in user.

### Returns

```ts
{
  id,
  email,
  name,
  image,
  createdAt,
  updatedAt
}
```

or

```ts
null
```

if the user is not authenticated or an error occurs.

### Key Benefit

```txt
Reusable + Secure + Centralized User Fetching
```


## Mistake 1 — Docker Manual Setup

Tried manual/random installations first.

### Fix

Used proper WSL installation command:

```bash
wsl --install debian
```

---

## Mistake 2 — Docker Desktop Not Opening

Docker Desktop was failing multiple times.

### Fix

* reinstalled Docker Desktop
* upgraded WSL
* restarted PC
* retried engine startup

Finally worked.

---

## Mistake 3 — Overcomplicating Prisma Output

Initially thinking custom Prisma output required.

### Fix

Removed unnecessary output configuration for now.

Kept setup simpler.

---

# What I Learned

## From Docker

* Docker containers isolate environments
* PostgreSQL can run without local installation
* WSL is important on Windows
* Docker on Windows can become painful 😭

---

## From Prisma

* Prisma migrations are actually very clean
* Schema-driven DB setup feels easier
* Migration generation is powerful


What a Prisma Better-Auth Issue CheckOut I Raised The Issue
->> https://github.com/prisma/prisma/issues/29590
---

## From Project Setup

* Environment setup takes WAY more time than expected
* DevOps/setup problems are real
* Small configuration mistakes waste huge time
* Simpler setup is usually better initially

---

# Future Plans

Planned features:

* AI API explanation system
* Request debugging suggestions
* Smart fetch recommendations
* API learning assistant
* Better response visualization
* AI-generated API docs
* Request history
* Collections like Postman

---

# Conclusion

This was basically foundation setup phase of project.

Even though actual features are not started fully yet, setup itself taught many things:

* Docker
* Prisma
* PostgreSQL
* Better Auth
* Environment handling
* Windows development pain 😂

Currently project base architecture is ready and stable.

Now real building phase can start 🚀


__________________________________________