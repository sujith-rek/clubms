import { ironOptions } from "@/lib/ironOptions";
import { getUser } from "@/services/users.services";
import { compareSync } from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function login(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ status: 400, message: "Please fill all the fields" })
    }
    try {
        const user = await getUser(email);
        if (user === null) {
            return res.json({ status: 400, message: "CC Member not found" })
        }
        if(user.role != 'CC') {
            return res.json({ status: 400, message: "CC Member not found" })
        }
        const valid = compareSync(password, user.password);

        const ccWithoutPassword = {
            ...user,
            password: undefined
        }
        req.session.user = ccWithoutPassword;
        if (valid) {
            return res.json({ status: 200, message: "Club logged in successfully", cc: ccWithoutPassword })
        } else {
            return res.json({ status: 400, message: "Invalid credentials" })
        }
    } catch (err) {
        return res.json({ status: 400, message: err.message })
    }
}, ironOptions);