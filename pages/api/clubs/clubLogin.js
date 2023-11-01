import { loginClub } from "@/services/users.services";
import { compareSync } from "bcrypt";

export default async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" })
    }
    try {
        const club = await loginClub({
            email,
            password,
        })

        if (club === null) {
            return res.status(400).json({ error: "Club not found" })
        }

        const valid = compareSync(password,club.password)
        console.log(valid,password,club)

        if (valid) {
            return res.status(200).json({ message: "Club logged in successfully", club: club })
        } else {
            return res.status(400).json({ error: "Invalid credentials" })
        }

    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}