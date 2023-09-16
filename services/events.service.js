import db from "@/lib/prisma";

export async function eventCreate(data){
    return await db.event.create({
        data
    })
}

export async function eventUpdate(id, data){
    return await db.event.update({
        where: { id },
        data
    })
}

export async function eventDelete(id){
    return await db.event.delete({
        where: { id }
    })
}

export async function eventFindUnique(id){
    return await db.event.findUnique({
        where: { id }
    })
}

export async function eventFindMany(){
    return await db.event.findMany()
}

export async function eventFindManyByClubId(clubId){
    return await db.event.findMany({
        where: { clubId }
    })
}

