// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import { db } from "./config/db.js"; // Import the db function
import User from "./models/User.js"; // Import models
import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
// import focusRoutes from "./routes/focusRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database and sync models
db().then(() => {
    console.log("Database setup complete");

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/tasks", taskRoutes);
    // app.use("/api/admin", adminRoutes);
    app.use("/api/calendar", calendarRoutes);
    // app.use("/api/focus", focusRoutes);

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
    console.error("Failed to start the server:", error);
});