// routes/focusRoutes.js
import express from "express";
import {
    saveSettings,
    saveSession,
    getSettings,
    getSessions,
    getSessionById, // Add this import
} from "../controllers/focusTimerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Save focus timer settings
router.post("/settings", saveSettings);

// Save focus session
router.post("/session", saveSession);

// Get focus timer settings
router.get("/settings", getSettings);

// Get all focus sessions
router.get("/sessions", getSessions);

// Get a specific focus session by ID
router.get("/session/:id", getSessionById); // Add this route

export default router;