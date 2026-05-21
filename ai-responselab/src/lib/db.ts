import { PrismaClient } from '@prisma/client'

declare global{
    var prisma:PrismaClient | undefined
}

const db = globalThis.prisma || new PrismaClient({
    log:['query','info','warn','error']
})
if(process.env.NODE_ENV === 'development'){
global.prisma=db
}
export default db;

// file just like a global variable we using all around the project