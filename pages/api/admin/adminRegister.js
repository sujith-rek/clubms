import { registerAdmin } from "@/services/users.services";
import { hashSync } from "bcrypt";

export default async function register(req, res) {

    const { email, password, name } = req.body
    if (!email || !password || !name) {
        return res.status(400).json({ error: "Please fill all fields" })
    }
    try {
        const admin = await registerAdmin({
            email: email,
            password: hashSync(password, 10),
            name: name,
            role: "ADMIN"
        })
        return res.status(200).json({ message: "Admin created successfully", admin: admin })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}