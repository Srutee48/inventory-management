import express from "express"; //Framework to build APIs and handle HTTP requests.
import dotenv from "dotenv";  //Allows us to load secret information (e.g., passwords) from the .env file.
import sequelize from "./config/db.js"; //The database connection we created earlier (from db.js).
import protectedRoutes from "./routes/protectedRoutes.js"; 
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); //Loads variables from the .env file and makes them available via process.env.

const app = express(); //Creates an Express instance to build our API.
const PORT = process.env.PORT || 5000;  
/**Sets the port where the server will listen: 
If process.env.PORT is defined in .env, it uses that value.
If not, it defaults to 5000.*/

app.use(express.json()); 
/**Allows the server to accept incoming JSON data. 
When a client sends data (like product info), Express automatically parses it into JavaScript objects.
 */
// express.json() is built-in middleware that allows Express to handle JSON request bodies

app.use("/api/auth", authRoutes);
app.use ("/api/protected",protectedRoutes);
// This means all authentication-related routes (like register) will be available under /api/auth/....

// Our POST /register route will now be accessible at http://localhost:5000/api/auth/register.?



// app.get("/", (req,res)=>{
//     res.send("Inventory System API is running...");
// });

/**	When you visit http://localhost:5000/, it responds with: 
o	Inventory System API is running...
•	req → Represents the incoming request.
•	res → Represents the outgoing response.
 */

// const startServer = async()=>{
//     try {
//         await sequelize.authenticate(); /** Checks if the database connection is working.If successful, it prints: Database connected successfully.
//         */
//         console.log("Database connected successfully");
//         app.listen(PORT,()=>{
//             console.log('Server running on port ${PORT}');
//         });    /**app.listen(PORT, callback)  Starts the Express server on the specified port. Logs: Server running on port 5000
//         */
//     } catch (error) {
//         console.log("Error connecting to database: " ,error);
//     } /** Error Handling: If database connection fails, it logs:  Error connecting to database: [error details]
//     */
   
// };

//startServer(); //Executes the startServer function and initializes the server.



import User from "./models/user.js"; /**import: This brings in code from another file.
User: The User model we defined in models/User.js.
./models/User.js: The relative path to the User.js file. */

/**why ? We import the User model to register it with Sequelize and sync it with the database. */
sequelize.sync({force: true })
    .then(()=> {
        console.log("Database synced successfully");
        app.listen(5000,()=> console.log("Server running on port 5000"));
    }) //.then(): Runs the provided function if .sync() succeeds.
    .catch((err)=>console.log("model sync error:",err));  //.catch(): Runs if an error happens during .sync().

 /**sequelize: Our Sequelize instance (database connection) imported from config/db.js.
.sync(): Synchronizes all models (like User) with the MySQL database.
👉 { force: false } – Controls whether to drop and recreate tables:

false: If the table already exists, don’t drop it (preserves data).
true: Drops the table and recreates it (destroys data, useful for development).
✅ Why?
This ensures the tables in your database match your models. */    




// This imports the authentication routes (/register)

// Middleware for JSON parsing

// Use the auth routes
