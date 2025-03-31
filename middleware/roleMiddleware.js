const authorizeRoles = (...allowedRoles) => { //Allows multiple roles (e.g., authorizeRoles("admin", "manager")).
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)){ //If the user's role is not in the allowed list, return 403 Forbidden.
            return res.status(403).json ({
                message : "Access denied. Insufficient permissiond."
            });
        }
        next(); //If the user has permission, move to the next middleware.
    };
};

export default authorizeRoles;