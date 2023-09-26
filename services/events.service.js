import db from "@/lib/prisma";

export async function eventCreate(data){
    return await db.event.create({
        data
    })
}

export async function eventApprovalCreate(data){
    return await db.eventapproval.create({
        data
    })
}

export async function getEventApprovalByEventId(eventId){
    return await db.event.findUnique({
        where: {id: eventId},
        select: { Eventapproval: true }
    })
}

export async function eventApprovalDelete(eventId, clubId){
    const eventApproval = await db.eventapproval.findUnique({
        where: {
            eventId: eventId,
            event: {
                id: eventId,
            }
        }
    })
    return await db.eventapproval.delete({
        where: { id: eventApproval.id }
    })
}


export async function eventUpdate(id, data){
    return await db.event.update({
        where: { id },
        data
    })
}

export async function eventDelete(id,clubId){

    return await db.event.delete({
        where: { id: id, clubId: clubId }
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

