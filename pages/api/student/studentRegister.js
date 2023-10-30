import { registerStudent } from "@/services/users.services";
import { hashSync } from "bcrypt";

export default async function signupStudent(req,res) {
    const {name, email, password, rollNo} = req.body;
    if(!email || !password || !name || !rollNo) {
        return res.status(400).json({error : "Please fill all the fields"})
    }
    try {
        const student = await registerStudent({
            email : email,
            password: hashSync(password, 10),
            name : name,
            rollNo: rollNo,
            role: "STUDENT"
        })
        return res.status(200).json({message : "Student created successfully", student: student})
    } catch (err) {
        return res.status(400).json({error : err.message})
    }
}