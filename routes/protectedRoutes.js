import express from "express";
//import {authenticateUser , authorizeRoles } from "../middleware/authMiddleware.js";
//import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();


// router.get("/dashboard", authMiddleware, (req, res) => {
//     res.status(200).json({
//       message: "Welcome to the dashboard !.",
//       user : req.user
//     });
//   });


// router.get("/profile",authMiddleware,(req,res)=>{ 
//     res.status(200).json(
//         {
//             message: "Profile data retrieved successfully",
//             user: req.user,
//         }
//     );
// });


export default router;