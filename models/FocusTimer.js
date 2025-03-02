import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const FocusTimer = sequelize.define(
    "FocusTimer",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        pomodoroDuration: {
            type: DataTypes.INTEGER,
            defaultValue: 25, // Default Pomodoro duration (in minutes)
        },
        shortBreakDuration: {
            type: DataTypes.INTEGER,
            defaultValue: 5, // Default short break duration (in minutes)
        },
        longBreakDuration: {
            type: DataTypes.INTEGER,
            defaultValue: 15, // Default long break duration (in minutes)
        },
        sessionDuration: {
            type: DataTypes.INTEGER, // Duration of the focus session (in minutes)
            allowNull: false,
        },
        sessionDate: {
            type: DataTypes.DATE, // Date of the focus session
            defaultValue: DataTypes.NOW,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users", // Match the table name in the User model
                key: "id",
            },
        },
    },
    {
        timestamps: true,
        tableName: "focusTimers",
    }
);

export default FocusTimer;