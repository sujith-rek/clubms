import db from "@/lib/prisma";

// Equivalent to: INSERT INTO roomBookApproval (column1, column2, ...) VALUES (value1, value2, ...);
export async function roombookCreate(data) {
    return await db.roomBookApproval.create({
        data
    })
}

// Equivalent to: UPDATE roomBookApproval SET column1 = value1, column2 = value2, ... WHERE id = roombookId;
export async function roombookUpdate(roombookId, data) {
    return await db.roomBookApproval.update({
        where: { id: roombookId },
        data
    })
}

// Equivalent to: DELETE FROM roomBookApproval WHERE id = roombookId;
export async function roombookDelete(roombookId) {
    return await db.roomBookApproval.delete({
        where: { id: roombookId }
    })
}

// Equivalent to: UPDATE roomBookApproval SET adminStatus = 'APPROVED' WHERE id = roombookId;
export async function approveRoomBook(roombookId) {
    return await db.roomBookApproval.update({
        where: { id: roombookId },
        data: {
            adminStatus: "APPROVED"
        }
    })
}

// Equivalent to: UPDATE roomBookApproval SET adminStatus = 'REJECTED' WHERE id = roombookId;
export async function rejectRoomBook(roombookId) {
    return await db.roomBookApproval.update({
        where: { id: roombookId },
        data: {
            adminStatus: "REJECTED"
        }
    })
}

// Equivalent to: INSERT INTO room (column1, column2, ...) VALUES (value1, value2, ...);
export async function addRooms(data) {
    return await db.room.create({
        data
    })
}

// Equivalent to: UPDATE room SET column1 = value1, column2 = value2, ... WHERE id = roomId;
export async function updateRoom(roomId, data) {
    return await db.room.update({
        where: { id: roomId },
        data
    })
}

// Equivalent to: DELETE FROM room WHERE id = roomId;
export async function deleteRoom(roomId) {
    return await db.room.delete({
        where: { id: roomId }
    })
}

// Equivalent to: SELECT * FROM room WHERE ...;
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

// Equivalent to: SELECT * FROM roomBookApproval WHERE clubId = clubId;
export async function fetchBookedRooms(clubId) {
    return await db.roomBookApproval.findMany({
        where: {
            clubId: clubId,
        }
    })
}

// Equivalent to: SELECT * FROM room;
export async function fetchAllRooms() {
    return await db.room.findMany();
}

// Equivalent to: SELECT * FROM roomBookApproval WHERE adminStatus = 'PENDING';
export async function fetchPendingRooms() {
    return await db.roomBookApproval.findMany({
        where: {
            adminStatus: "PENDING",
        }
    })
}

// Equivalent to: SELECT * FROM roomBookApproval WHERE adminStatus = 'APPROVED';
export async function fetchApprovedRooms() {
    return await db.roomBookApproval.findMany({
        where: {
            adminStatus: "APPROVED",
        }
    })
}

// Equivalent to: SELECT * FROM roomBookApproval WHERE adminStatus = 'REJECTED';
export async function fetchRejectedRooms() {
    return await db.roomBookApproval.findMany({
        where: {
            adminStatus: "REJECTED",
        }
    })
}
