import { getAdmin } from "@/services/users.services"
import { compareSync } from "bcrypt"

export default async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Please fill all fields" })
    }
    try {
        const admin = await getAdmin({
            email: email,
        })

        if (admin === null) {
            return res.status(400).json({ error: "Admin not found" })
        }

        const valid = compareSync(password, admin.password);
        if (valid) {
            return res.status(200).json({ message: "Admin logged in successfully", admin: admin })
        } else {
            return res.status(400).json({ error: "Invalid credentials" })
        }
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}
