import { ironOptions } from "@/lib/ironOptions";
import { getClub } from "@/services/users.services";
import { compareSync } from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ status: 400, message: "Please fill all the fields" })
    }
    try {
        const club = await getClub(email)
        if (club === null) {
            return res.json({ status: 400, message: "Club not found" })
        }

        const valid = compareSync(password, club.password)

        const clubWithoutPassword = {
            ...club,
            password: undefined
        }
        req.session.user = clubWithoutPassword;
        await req.session.save();
        if (valid) {
            return res.json({ status: 200, message: "Club logged in successfully", club: clubWithoutPassword })
        } else {
            return res.json({ status: 400, message: "Invalid credentials" })
        }

    } catch (err) {
        return res.json({ status: 400, message: err.message })
    }
}, ironOptions);