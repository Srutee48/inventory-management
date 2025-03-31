import { Sequelize } from "sequelize";
//This imports the Sequelize class from the sequelize package.

import dotenv from "dotenv";  
// This allows us to load environment variables from a .env file.

dotenv.config();
// This function loads the variables from the .env file and makes them available throughout the app.

const sequelize = new Sequelize( // This creates a new Sequelize instance that allows us to interact with the database.
  process.env.DB_NAME, //Database name from the .env file.
  process.env.DB_USER, //MySQL username (usually root by default).
  process.env.DB_PASSWORD, //MySQL password (from when you installed MySQL).
  {
    host:process.env.DB_HOST,//Where the database is running (usually localhost for your machine).
    dialect:"mysql", //Tells Sequelize we are using a MySQL database. Sequelize also works with PostgreSQL, SQLite, and others, but here we’re focusing on MySQL.
  } 
);

export default sequelize; //This allows us to use the sequelize instance in other files (like server.js).