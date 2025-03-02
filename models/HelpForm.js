// models/HelpForm.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const HelpForm = sequelize.define(
    "HelpForm",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        subject: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true, // Remarks can be null initially
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        tableName: "help_forms", // Explicitly set the table name
    }
);

export default HelpForm;