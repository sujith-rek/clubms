import db from "@/lib/prisma";

export async function fetchAllClubs() {
    return await db.user.findMany({
        where : {
            role : 'CLUB',
        }
    })
}