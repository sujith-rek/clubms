import db from "@/lib/prisma";

export async function eventCreate(data) {
    return await db.event.create({
        data
    })
}

export async function eventApprovalCreate(data) {
    return await db.eventapproval.create({
        data
    })
}

export async function getEventApprovalByEventId(eventId) {
    return await db.event.findUnique({
        where: { id: eventId },
        select: { Eventapproval: true }
    })
}

export async function eventApprovalDelete(eventId, clubId) {
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


export async function eventUpdate(id, data) {
    return await db.event.update({
        where: { id },
        data
    })
}

export async function eventDelete(id, clubId) {

    return await db.event.delete({
        where: { id: id, clubId: clubId }
    })
}

export async function eventFindUnique(id) {
    return await db.event.findUnique({
        where: { id }
    })
}

export async function eventFindMany() {
    return await db.event.findMany({
        include: { Eventapproval: true }
    })
}

export async function eventFindManyByClubId(id) {
    return await db.event.findMany({
        where: { clubId: id },
        include: { Eventapproval: true }
    })
}


export async function eventsApprovedFindMany() {
    return await db.event.findMany({
        where: {
            Eventapproval: {
                AND: [
                    { adminStatus: 'APPROVED' },
                    { ccStatus: 'APPROVED' }
                ]
            }
        },
        include: { Eventapproval: true }
    })
}

export async function eventsAdminPending() {
    return await db.event.findMany({
        where: {
            Eventapproval: {
                adminStatus: 'PENDING'
            }
        },
        include: { Eventapproval: true }
    })
}

export async function eventsAdminApproved() {
    return await db.event.findMany({
        where: {
            Eventapproval: {
                adminStatus: 'APPROVED'
            }
        },
        include: { Eventapproval: true }
    })
}

export async function eventsAdminRejected() {
    return await db.event.findMany({
        where: {
            Eventapproval: {
                adminStatus: 'REJECTED'
            }
        },
        include: { Eventapproval: true }
    })
}

