import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: false, // Optional: Disable logging of SQL queries
    }
);

// Function to connect to the database and sync models
export const db = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");

        // Sync models with the database, using alter: true
        await sequelize.sync({ alter: true });
        console.log("Database synchronized with models");
    } catch (error) {
        console.error("Failed to connect to or sync with the database:", error);
        process.exit(1); // Stop the application if the database connection fails
    }
};

export default sequelize;