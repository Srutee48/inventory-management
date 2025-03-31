import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
const router = express.Router();


//Requires authentication (authMiddleware).
//Requires admin role (authorizeRoles("admin")).
router.get("/admin/dashboard", authMiddleware, authorizeRoles("admin"), (req, res) => {
    res.status(200).json({
      message: "Welcome admin to the dashboard !. you have full access.",
      //user: req.user, // User data from JWT payload
    });
  });


router.get("/profile",authMiddleware,(req,res)=>{ //Any logged-in user (admin or regular) can access their profile.
    res.status(200).json(
        {
            message: "Profile data retrieved successfully",
            user: req.user,
        }
    );
});


export default router;