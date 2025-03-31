import bcrypt from "bcrypt"; //bcrypt helps us hash passwords securely.
import jwt from "jsonwebtoken"; //Allows us to create and verify tokens.
import express from "express";
import User from "../models/user.js";//
import { registerUser } from "../controllers/authController.js"; 

const router = express.Router();//Imports the User model to interact with the database.
// express.Router(): Allows us to create routes in a modular way.

router.post("/register", registerUser);
router.post("/register",async(req,res)=>{ //router.post() creates a POST route for /register.async allows asynchronous database operations.


    try {
        const {name , email , password ,role } = req.body;

        if (!name || !email || !password ){ //Extracts name, email, and password from the request.//If any field is missing, returns a 400 Bad Request response.
            return res,status(400).json({message : "All fields are required "});
        }

        const existingUser = await User.findOne ({where :{email}});
        if (existingUser){
            return res.status(409).json({message: "Email already in use."});
        }//findOne() checks if the email already exists.If it does, we return 409 Conflict to indicate a duplicate.

        // const newUser = await User.create({name , email , password}); //User.create() adds a new user to the database.
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds); 
        // saltRounds = 10: Determines the complexity of the hash. bcrypt.hash(password, saltRounds): Hashes the user's password securely.
        const newUser = await User.create({
            name,
            email,
            password: hashPassword, //Stores the hashed password in the database instead of plaintext.
            role: role || "user",//If no role is provided, default to "user"
        });
        res.status(201).json({
            message:"User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        });
        //201 Created: Standard status for successful resource creation.Sends back user details (excluding the password for security)
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
        // if ( password !== user.password) {
        //     return res.status(401).json({ message : "Invalid credentials" });
        // }
        const isMatch = await bcrypt.compare (password, user.password);
        // bcrypt.compare(password, user.password):
        // password = User’s entered password.
        // user.password = Hashed password from the database.
        // Returns true if they match, otherwise false.
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
        /**The payload contains user details (id, email).
        *The secret key (JWT_SECRET) ensures only our server can validate tokens.
        *Expiration time (1d) means users must log in again after 1 day. */

        res.status(200).json({
            message : "Login successful" ,
            token,//The client must store this token (e.g., in localStorage).
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