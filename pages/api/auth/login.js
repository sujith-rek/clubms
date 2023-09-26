import { loginAdmin } from "@/services/users.services"

export default function login(req,res){
    const {email,password} = req.body
    
    if(!email || !password){
        return res.status(400).json({error:"Please fill all fields"})
    }
    try{
        loginAdmin({
            email,
            password
        })
        return res.status(200).json({message:"Admin logged in successfully"})
    }catch(err){
        return res.status(400).json({error:err.message})
    }
}
