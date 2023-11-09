import db from "@/lib/prisma";


export async function roombookCreate(data) {
    return await db.roomBookApproval.create({
        data
    })
}

export async function roombookUpdate(roombookId, data) {
    return await db.roomBookApproval.update({
        where: { id: roombookId },
        data
    })
}


export async function roombookDelete(roombookId) {
    return await db.roomBookApproval.delete({
        where: { id: roombookId }
    })
}


export async function approveRoomBook(roombookId, data) {
    return await db.roomBookApproval.update({
        where: { id: roombookId },
        data
    })
}


export async function addRooms(data) {
    return await db.room.create({
        data
    })
}

export async function updateRoom(roomId, data) {
    return await db.room.update({
        where: { id: roomId },
        data
    })
}

export async function deleteRoom(roomId) {
    return await db.room.delete({
        where: { id: roomId }
    })
}

export async function checkRoomAvailabilty(data) {
    return await prisma.room.findMany({
        where: {
            roomBookApproval: {
                none: {
                    OR: [
                        {
                            from: { lt: data.endDate }, // Booking starts after the selected end date and time
                        },
                        {
                            to: { gt: data.startDate }, // Booking ends before the selected start date and time
                        },
                    ],
                }
            },
        },
    });
}

export async function fetchBookedRooms(clubId) {
    return await db.roomBookApproval.findMany({
        where : {
            clubId : clubId,
        }
    })
}

export async function fetchAllRooms () {
    return await db.room.findMany();
}


