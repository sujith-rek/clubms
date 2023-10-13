import { registerClub } from "@/services/users.services";
import { hashSync } from "bcrypt";

export default function signupClub(req, res) {
    const { email, password, name, description } = req.body;
    if(!email || !password || !name) {
        return res.status(400).json({error : "Please fill all the fields"})
    }
    try {
        registerClub({
            email,
            password: hashSync(password,10),
            name,
            description
        })
        return res.status(200).json({message : "Club created successfully"})
    } catch (err) {
        return res.status(400).json({error : err.message})
    }
}