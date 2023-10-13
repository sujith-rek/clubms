import { loginAdmin } from "@/services/users.services"

export default async function login(req,res){
    const {email,password} = req.body
    
    if(!email || !password){
        return res.status(400).json({error:"Please fill all fields"})
    }
    try{
        const admin = await loginAdmin({
            email,
            password,
        })

        if (admin === null) {
            return res.status(400).json({ error: "Admin not found" })
        }

        const valid = compareSync(password, admin.password);
        if (valid) {
            return res.status(200).json({ message: "Admin logged in successfully" })
        } else {
            return res.status(400).json({ error: "Invalid credentials" })
        }
    }catch(err){
        return res.status(400).json({error:err.message})
    }
}
