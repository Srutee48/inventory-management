import jwt from "jsonwebtoken";

const authMiddleware = (req ,res, next) => {
    try {
        const token = req.header("Authorization"); 
        if (!token){
            return res.status(401).json({ message : "Access denied . no token provided"});
        }
        const decoded = jwt.verify(token.replace("Bearer",""),process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({message : "Invalid or expired token"});
    }
};

export default authMiddleware;