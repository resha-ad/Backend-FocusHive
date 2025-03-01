import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CalendarEvent = sequelize.define("CalendarEvent", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        defaultValue: "pink",
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: "calendar_events",
});

export default CalendarEvent;