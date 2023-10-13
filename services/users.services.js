import db from "@/lib/prisma";
import { compareSync } from "bcrypt";

export async function registerAdmin(data) {
    return await db.admin.create({
        data
    })
}

export async function registerClub(data) {
    return await db.club.create({
        data
    })
}

export async function loginAdmin(data) {
    return db.admin.findUnique({
        where: {
            email: data.email
        }
    })
}

export async function loginClub(data) {
    return db.club.findUnique({
        where: {
            email: data.email,
        }
    })
}
