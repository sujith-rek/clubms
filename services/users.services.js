import db from "@/lib/prisma";
import { compareSync } from "bcrypt";

export async function registerAdmin(data) {
    return await db.user.create({
        data
    })
}

export async function registerClub(data) {
    return await db.user.create({
        data
    })
}

export async function loginAdmin(data) {
    return db.user.findUnique({
        where: {
            email: data.email
        }
    })
}

export async function loginClub(data) {
    return db.user.findUnique({
        where: {
            email: data.email,
        }
    })
}
