import express from "express";
import { authenticateUser , authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/admin/dashboard" , authenticateUser ,authorizeRoles(["admin"]),(req,res)=> { 
//     res.json({ message: "Welcome to the Admin Dashboard!"});
// });
router.get("api//admin/dashboard", authenticateUser, authorizeRoles(["admin"]), (req, res) => {
    res.json({
        message: "Welcome to the Admin Dashboard!"
    });
});

router.get("/create-user" , authenticateUser ,authorizeRoles(["admin"]),(req,res)=> {
    res.json({
        message: "User creation successful (Admin only)"
    });
})


export default router;