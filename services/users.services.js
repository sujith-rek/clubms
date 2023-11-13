import db from "@/lib/prisma";

// Equivalent to: INSERT INTO user (column1, column2, ...) VALUES (value1, value2, ...) for CC
export async function registerCC(data) {
    return await db.user.create({
        data
    });
}

// Equivalent to: INSERT INTO user (column1, column2, ...) VALUES (value1, value2, ...) for Admin
export async function registerAdmin(data) {
    return await db.user.create({
        data
    });
}

// Equivalent to: INSERT INTO user (column1, column2, ...) VALUES (value1, value2, ...) for Club
export async function registerClub(data) {
    return await db.user.create({
        data
    });
}

// Equivalent to: INSERT INTO user (column1, column2, ...) VALUES (value1, value2, ...) for Student
export async function registerStudent(data) {
    return await db.user.create({
        data
    });
}

// Equivalent to: SELECT * FROM user WHERE email = data.email;
export async function getAdmin(data) {
    return db.user.findUnique({
        where: {
            email: data.email
        }
    });
}

// Equivalent to: SELECT * FROM user WHERE email = email;
export async function getClub(email) {
    return db.user.findUnique({
        where: {
            email: email,
        }
    });
}

// Equivalent to: SELECT * FROM user WHERE email = mail;
export async function getUser(mail) {
    return db.user.findUnique({
        where: {
            email: mail,
        }
    });
}
