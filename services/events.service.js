import db from "@/lib/prisma";

export async function eventCreate(data){
    return await db.event.create({
        data
    })
}