import { getUser, registerCC } from "@/services/users.services";
import { hashSync } from "bcrypt";
import { withSessionRoute } from "@/lib/ironOptions";

export default withSessionRoute(signupCC);

async function signupCC(req, res) {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.json({ status: 400, message: "Please fill all the fields" })
    }
    try {
        const user = await getUser(email);
        if (user) {
            return res.json({ status: 400, message: "Club already exists" });
        } else {
            const cc = await registerCC({
                "email" : email,
                "password" : hashSync(password,10),
                "name" : name,
                "role" : "CC"
            })

            const ccWithouPassword = {
                ...cc,
                password : undefined
            }

            req.session.user = ccWithouPassword;
            await req.session.save();
            return res.json({ status: 200, cc : ccWithouPassword })
        }
    } catch (err) {
        return res.json({ status: 400, message: err.message })
    }
}