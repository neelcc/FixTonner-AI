import UserModel from "../model/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { z } from 'zod'

const  userRegister = async (req,res) => {

    const userSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long")
    })
    const parsed = userSchema.safeParse(req.body)

    
    if (!parsed.success) {
        return res.status(400).send({
            success: false,
            errors: parsed.error.errors.map(err => err.message)
        })
    }

    const { name , email , password } = parsed.data 

    try {
       
        
        
        const find_user = await UserModel.findOne({email})
        
        if(find_user){
            return res.status(409).send({
                success : false,
                message : "User already exists!"
            })  
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = await UserModel.create({
            name,
            email,
            password:hashedPassword
        })

        const token = jwt.sign({ email: email, id: user._id },process.env.JWT_SECRET,{ expiresIn : 60*60 })
        
        
        res.status(201).send({
            success : true,
            user,
            token
        })

    } catch (error) {
        return res.send({
            success : false ,
            message : error.message
        })
    }
} 

const userLogin = async (req,res) => {
    
    const userSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long")
    })
    const parsed = userSchema.safeParse(req.body)
    
    if (!parsed.success) {
        return res.status(404).send({
            success: false,
            errors: parsed.error.errors.map(err => err.message)
        })
    }
    
    const { email , password } = parsed.data 
    
    try {
        
        const user = await UserModel.findOne({ email })
        if(!user){
            return res.status(409).send({
                success : false,
                message : "User not found!"
            })
        }
        
        const comparedPassword = await bcrypt.compare(password, user.password)
        
        if(!comparedPassword){
            return res.status(409).send({
                success : false,
                message: "Password is incorrect!"
            })
        }
        
        
        const token = jwt.sign({ email: email, id: user._id },process.env.JWT_SECRET,{ expiresIn : 60*60 })

        res.status(209).send({
            success:true,
            user,
            token
        })

    } catch (error) {
        
    }
}

const userCredits = async (req,res) => {
    const userId = req.user.id
    const user = await UserModel.findById(userId)
    res.status(201).send({
        success : true,
        user : user,
        credits : user.credits
    })
}

export  { userRegister , userLogin, userCredits } 