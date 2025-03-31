import jwt from "jsonwebtoken";
//what is jwt authentication ?
// JWT (JSON Web Token) is a secure token-based authentication method that allows users to log in and stay authenticated across requests.

// When a user logs in, we generate a JWT token and send it to the client.

// The client must include this token in the Authorization header of every protected request.

// The server verifies the validity of the token before allowing access to protected resources.



const authMiddleware = (req ,res, next) => {
    try {
        const token = req.header("Authorization"); //The client sends the token in the Authorization header.
        if (!token){
            return res.status(401).json({ message : "Access denied . no token provided"});
        }
        const decoded = jwt.verify(token.replace("Bearer",""),process.env.JWT_SECRET);
        req.user = decoded;
        //jwt.verify() checks if the token is valid.req.user = decoded allows protected routes to access the user’s ID/email.
        next();
    } catch (error) {
        res.status(403).json({message : "Invalid or expired token"});
    }
};

export default authMiddleware;