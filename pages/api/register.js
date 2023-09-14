import { registerAdmin } from "@/services/users.services";
import { hashSync } from "bcrypt";

export default function register(req,res){
    const {email,password,name,role} = req.body
    if(!email || !password || !name || !role){
        return res.status(400).json({error:"Please fill all fields"})
    }
    try{
        registerAdmin({
            email,
            password: hashSync(password,10),
            name,
            role
        })
        return res.status(200).json({message:"Admin created successfully"})
    }catch(err){
        return res.status(400).json({error:err.message})
    }

    res.status(200).json({message:"Admin created successfully"})

}