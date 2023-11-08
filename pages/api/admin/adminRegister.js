import { withSessionRoute } from "@/lib/ironOptions";
import { getUser, registerAdmin } from "@/services/users.services";
import { hashSync } from "bcrypt";

export default withSessionRoute(async function register(req, res) {

    const { email, password, name } = req.body
    if (!email || !password || !name) {
        return res.json({ status: 400, message: "Please fill all fields" })
    }
    try {
        const user = await getUser(email);
        if (user) {
            return res.json({ status: 400, message: "Admin already exists" });
        } else {
            const admin = await registerAdmin({
                email: email,
                password: hashSync(password, 10),
                name: name,
                role: "ADMIN"
            })
            const adminWithoutPassword = {
                ...admin,
                password: undefined
            }
            req.session.user = adminWithoutPassword;
            await req.session.save();
            return res.json({ status: 200, admin: adminWithoutPassword })
        }
    } catch (err) {
        return res.json({ status: 400, message: err.message })
    }
});