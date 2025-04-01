import express from "express"; 
import dotenv from "dotenv"; 
import sequelize from "./config/db.js"; 
import protectedRoutes from "./routes/protectedRoutes.js"; 
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config(); 
const app = express();  

app.use(express.json()); 

app.use("/api", authRoutes);
app.use ("/api",protectedRoutes);
app.use("/api/admin", adminRoutes);


const PORT = process.env.PORT || 5000;  

sequelize.sync({force: false })
    .then(()=> {
        console.log("Database synced successfully");
        app.listen(5000,()=> console.log("Server running on port 5000"));
    }) 
    .catch((err)=>console.log("model sync error:",err));

 