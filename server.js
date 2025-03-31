import express from "express"; 
import dotenv from "dotenv"; 
import sequelize from "./config/db.js"; 
import protectedRoutes from "./routes/protectedRoutes.js"; 
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); 
const app = express(); 
const PORT = process.env.PORT || 5000;  

app.use(express.json()); 

app.use("/api/auth", authRoutes);
app.use ("/api/protected",protectedRoutes);


import User from "./models/user.js"; 
sequelize.sync({force: true })
    .then(()=> {
        console.log("Database synced successfully");
        app.listen(5000,()=> console.log("Server running on port 5000"));
    }) 
    .catch((err)=>console.log("model sync error:",err));

 