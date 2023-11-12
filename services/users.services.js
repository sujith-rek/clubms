import db from "@/lib/prisma";
import { compareSync } from "bcrypt";

export async function registerCC(data) {
    return await db.user.create({
        data
    })
}

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

export async function registerStudent(data) {
    return await db.user.create({
        data
    })
}

export async function getAdmin(data) {
    return db.user.findUnique({
        where: {
            email: data.email
        }
    })
}

export async function getClub(email) {
    return db.user.findUnique({
        where: {
            email: email,
        }
    })
}

export async function getUser(mail) {
    return db.user.findUnique({
        where: {
            email: mail,
        }
    })
}