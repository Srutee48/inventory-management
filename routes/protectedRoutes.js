import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
const router = express.Router();


router.get("/admin/dashboard", authMiddleware, authorizeRoles("admin"), (req, res) => {
    res.status(200).json({
      message: "Welcome admin to the dashboard !. you have full access.",
    });
  });


router.get("/profile",authMiddleware,(req,res)=>{ 
    res.status(200).json(
        {
            message: "Profile data retrieved successfully",
            user: req.user,
        }
    );
});


export default router;