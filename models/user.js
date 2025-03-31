//import Sequelize from "sequelize";
import { DataTypes } from "sequelize"; //DataTypes: Provides data types for Sequelize (e.g., STRING, INTEGER).
import sequelize from "../config/db.js"; //sequelize: Imports the database connection we set up in config/db.js

//const { DataTypes } =sequelize;
const User = sequelize.define("User",{ //sequelize.define(): Defines a new table (model) in the database. "User": Table name in MySQL (Users in plural form by default).
    id: {
        type: DataTypes.INTEGER, //type: DataTypes.INTEGER: Store as an integer.
        primaryKey: true, //primaryKey: true: Marks this as the primary key.
        autoIncrement: true, //autoIncrement: true: Automatically increases for each new user
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,  /**type: DataTypes.STRING: Text field for user names. allowNull: false: The name is required (cannot be empty). */
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail:true,
        },               /**unique: true: Ensures no two users have the same email. validate: { isEmail: true }: Validates email format (e.g., abc@example.com). */
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false, /**type: DataTypes.STRING: Store passwords as strings (we'll hash them later).allowNull: false: Password is required.*/
        
    },
    role: {
        //type : DataTypes.ENUM("admin", "user"),
        type : DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
    },
    /**ENUM("admin", "user") → Limits role values to "admin" or "user".

    defaultValue: "user" → New users get the "user" role unless specified otherwise. */
}, {
timestamps: true, /**  Automatically adds   createdAt → When the record is first added.updatedAt → When the record is updated.*/
});

export default User; // Allows us to import the User model in other files.

