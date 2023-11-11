import { withSessionRoute } from "@/lib/ironOptions";
import { getUser, registerStudent } from "@/services/users.services";
import { hashSync } from "bcrypt";

export default withSessionRoute(async function signupStudent(req, res) {
    const { name, email, password, rollNo } = req.body;
    if (!email || !password || !name || !rollNo) {
        return res.json({ status: 400, message: "Please fill all the fields" })
    }

    try {
        console.log(email);
        const user = await getUser(email);
        if (user) {
            return res.json({ status: 400, message: "User already exists" });
        } else {
            const student = await registerStudent({
                email: email,
                password: hashSync(password, 10),
                name: name,
                rollNo: rollNo,
                role: "STUDENT"
            })
            const studentWithoutPassword = {
                ...student,
                password: undefined
            }
            req.session.user = studentWithoutPassword;
            await req.session.save();
            return res.json({ status: 200, student: studentWithoutPassword })
        }
    } catch (err) {
        console.log(err);
        return res.json({ status: 400, message: err.message })
    }
})