const authorizeRoles = (...allowedRoles) => { 
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)){ 
            return res.status(403).json ({
                message : "Access denied. Insufficient permissiond."
            });
        }
        next(); 
    };
};

export default authorizeRoles;