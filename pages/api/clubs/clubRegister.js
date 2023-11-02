import { registerClub } from "@/services/users.services";
import { hashSync } from "bcrypt";

export default async function signupClub(req, res) {
    const { email, password, name, description } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: "Please fill all the fields" })

    }
    
    try {
        const club = await registerClub({
            email: email,
            password: hashSync(password, 10),
            name: name,
            description: description,
            role: "CLUB"
        })

        const clubWithoutPassword = {
            ...club,
            password: undefined
        }

        return res.status(200).json({ message: "Club created successfully", club: clubWithoutPassword })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}