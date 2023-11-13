import db from "@/lib/prisma";

// Equivalent to
// SELECT * FROM user WHERE role = 'CLUB';
export async function fetchAllClubs() {
    return await db.user.findMany({
        where : {
            role : 'CLUB',
        }
    })
}