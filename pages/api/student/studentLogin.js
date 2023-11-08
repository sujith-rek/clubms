import { getStudent, getUser } from "@/services/users.services";
import { compareSync } from "bcrypt";

export default async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ status: 400, message: "Please fill all the fields" })
    }

    try {
        const student = await getUser(email)
        if (student === null) {
            return res.json({ status: 400, message: "Student not found" })
        }

        const valid = compareSync(password, student.password);

        const studentWithoutPassword = {
            ...student,
            password: undefined
        }
        req.session.user = studentWithoutPassword;
        await req.session.save();
        if (valid) {
            return res.json({ status: 200, message: "Student logged in successfully", student: studentWithoutPassword })
        } else {
            return res.json({ status: 400, message: "Invalid credentials" })
        }
    } catch (err) {
        return res.json({ status: 400, message: err.message })
    }
}