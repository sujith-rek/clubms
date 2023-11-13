import db from "@/lib/prisma";

// Equivalent to: INSERT INTO event (name, description, ...) VALUES (name, description, ...);
export async function eventCreate(data) {
    return await db.event.create({
        data
    })
}

// Equivalent to: INSERT INTO eventapproval (eventId, ccStatus, adminStatus) VALUES (eventId, ccStatus, adminStatus);
export async function eventApprovalCreate(data) {
    return await db.eventapproval.create({
        data
    })
}

// Equivalent to: SELECT * FROM event WHERE id = eventId;
export async function getEventApprovalByEventId(eventId) {
    return await db.event.findUnique({
        where: { id: eventId },
        select: { Eventapproval: true }
    })
}

// Equivalent to: DELETE FROM eventapproval WHERE id = eventApprovalId;
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

// Equivalent to: UPDATE event SET name = name, description = description, ... WHERE id = id;
export async function eventUpdate(id, data) {
    return await db.event.update({
        where: { id },
        data
    })
}

// Equivalent to: DELETE FROM event WHERE id = id and clubId = clubId;
export async function eventDelete(id, clubId) {

    return await db.event.delete({
        where: { id: id, clubId: clubId }
    })
}

// Equivalent to: SELECT unique(*) FROM event WHERE id = id;
export async function eventFindUnique(id) {
    return await db.event.findUnique({
        where: { id }
    })
}

// Equivalent to: SELECT * FROM event;
export async function eventFindMany() {
    return await db.event.findMany({
        include: { Eventapproval: true }
    })
}

// Equivalent to: SELECT * FROM event WHERE clubId = id;
export async function eventFindManyByClubId(id) {
    return await db.event.findMany({
        where: { clubId: id },
        include: { Eventapproval: true }
    })
}

// Equivalent to: SELECT * FROM event WHERE clubId = id AND Eventapproval.adminStatus = 'APPROVED' AND Eventapproval.ccStatus = 'APPROVED';
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

// Equivalent to: SELECT * FROM event WHERE clubId = id AND Eventapproval.adminStatus = 'PENDING';
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

// Equivalent to: SELECT * FROM event WHERE clubId = id AND Eventapproval.adminStatus = 'APPROVED';
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

// Equivalent to: SELECT * FROM event WHERE clubId = id AND Eventapproval.adminStatus = 'REJECTED';
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
