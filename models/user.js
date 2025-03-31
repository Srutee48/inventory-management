import { DataTypes } from "sequelize"; 
import sequelize from "../config/db.js";
const User = sequelize.define("User",{ 
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail:true,
        },
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false, 
    },
    role: {
        //type : DataTypes.ENUM("admin", "user"),
        type : DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
    },
    
}, {
timestamps: true,
});

export default User; 

