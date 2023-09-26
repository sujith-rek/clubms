import db from "@/lib/prisma";
import { compareSync } from "bcrypt";

export async function registerAdmin(data){
    return await db.admin.create({
        data
    })
}

export async function loginAdmin(data){
    const admin = await db.admin.findUnique({
        where:{
            email:data.email
        }
    })
    if(!admin){
        throw new Error("No admin found")
    }

    const valid = compareSync(data.password,admin.password)
    
    if(!valid){
        throw new Error("Invalid password")
    }
    return admin
}
