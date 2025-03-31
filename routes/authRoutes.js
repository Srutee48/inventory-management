import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 
import express from "express";
import User from "../models/user.js";//
import { registerUser } from "../controllers/authController.js"; 

const router = express.Router();
router.post("/register", registerUser);
router.post("/register",async(req,res)=>{

    try {
        const {name , email , password ,role } = req.body;

        if (!name || !email || !password ){ 
            return res,status(400).json({message : "All fields are required "});
        }

        const existingUser = await User.findOne ({where :{email}});
        if (existingUser){
            return res.status(409).json({message: "Email already in use."});
        }
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds); 
        const newUser = await User.create({
            name,
            email,
            password: hashPassword, 
            role: role || "user",
        });
        res.status(201).json({
            message:"User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log("Registration Error:",error);
        res.status(500).json({message : "Server error . please try again."});
    }
});

router.post("/login",async(req,res) => {
    try {
        const { email , password } = req.body;
        if ( !email || !password ) {
            return res.status(400).json({ message : "Email and password are required" });
        }
        const user = await User.findOne({ where: { email }});
        if ( !user ) {
            return res.status(400).json({ message : "User not found. " });
        }
    
        const isMatch = await bcrypt.compare (password, user.password);
        if (!isMatch){
            return res.status(401).json(
                {
                    message : "Invalid credentials"
                }
            );
        }
        const token = jwt.sign(
            {
                id: user.id ,email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.status(200).json({
            message : "Login successful" ,
            token,
            user : {
                id: user.id,
                name:user.name,
                email:user.email,
            },
        });
    } catch ( error ) {
        console.error("Login Error:", error);
        res.status(500).json({ message : "Server error . Please try again "});
    }
});
export default router;