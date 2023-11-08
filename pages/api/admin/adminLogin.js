import { ironOptions } from "@/lib/ironOptions";
import { getAdmin, getUser } from "@/services/users.services"
import { compareSync } from "bcrypt"
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ status: 400, message: "Please fill all fields" })
    }
    try {
        const admin = await getUser(email)

        if (admin === null) {
            return res.json({ status: 400, message: "Admin not found" })
        }

        const valid = compareSync(password, admin.password);
        if (valid) {
            const adminWithoutPassword = {
                ...admin,
                password: undefined,
            }
            req.session.user = adminWithoutPassword;
            await req.session.save();
            return res.json({ status: 200, message: "Admin logged in successfully", admin: admin })
        } else {
            return res.json({ status: 400, message: "Invalid credentials" })
        }
    } catch (err) {
        return res.json({ status: 400, message: err.message })
    }
}, ironOptions);
