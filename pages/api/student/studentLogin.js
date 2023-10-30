import { loginStudent } from "@/services/users.services";
import { compareSync } from "bcrypt";

export default async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" })
    }

    try {
        const student = await loginStudent({
            email,
            password,
        })
        if (student === null) {
            return res.status(400).json({ error: "Student not found" })
        }
        const valid = compareSync(password, student.password);
        if (valid) {
            return res.status(200).json({ message: "Student logged in successfully", student: student })
        } else {
            return res.status(400).json({ error: "Invalid credentials" })
        }
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}