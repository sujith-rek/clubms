import { getClub, registerClub } from "@/services/users.services";
import { hashSync } from "bcrypt";
import { withSessionRoute } from "../../../lib/ironOptions";
export default withSessionRoute(signupClub);

async function signupClub(req, res) {
    const { email, password, name, description } = req.body;
    if (!email || !password || !name) {
        return res.json({ status: 400, message: "Please fill all the fields" })
    }
    try {
        const user = await getClub(email);
        if (user) {
            return res.json({ status: 400, message: "Club already exists" });
        } else {
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
            req.session.user = clubWithoutPassword;
            await req.session.save();
            return res.json({ status: 200, club: clubWithoutPassword })
        }
    } catch (err) {
        return res.json({ status: 400, message: err.message })
    }
}