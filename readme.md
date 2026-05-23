# This project is based on similar work of postman that more then it not only reposne -req but a mixed version of ai suggested where it  teach about each fetchs recommandations, and many more so Stay Tuned for Updates TechStack Used #nextjs15 #tailwindcss #shadcn #aisdk

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

# Type-Safe `.env` Setup

In current project we also make type-safe `.env` handling so there is less chance of environment variable errors.

Created under:

```txt
lib/env
```

Reason:
Sometimes typo in env variable names creates silent bugs and debugging becomes painful.

So making type-safe env handling is actually worth it.

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

---

# Mistakes + Fixes Section

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
