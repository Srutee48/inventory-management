import jwt from "jsonwebtoken";
import User  from "../models/user.js";

export const authenticateUser = (req ,res, next) => {
    const token = req.header("Authorization"); 
    if (!token){
        return res.status(401).json({ message : "Access denied . no token provided"});
    }
    try {    
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        console.log("decoded Token :" , decoded);
        next();
    } catch (error) {
        //res.status(403).json({message : "Invalid or expired token"});
        if(error.name === 'TokenExpiredError'){
            res.status(401).json({message: "Token Expired"});
        } else if (error.name === 'JsonWebTokenError'){
            res.status(400).json({ message: "Invalid Token" });
        } else {
            res.status(500).json({message: "Server Error"});
        }


    }
};


export const authorizeRoles = (roles) => {
    return (req , res , next) => {
        console.log("User Role:", req.user?.role);
        if (!roles.includes(req.user?.role)){
            return res.status(403).json({
                message: "Forbidden : Access Denied"
            });
        }
        next();
    };
};
