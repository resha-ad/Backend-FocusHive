import express from "express";
import {
    saveSettings,
    saveSession,
    getSettings,
    getSessions,
} from "../controllers/focusTimerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes (require authentication)
router.post("/settings", authMiddleware, saveSettings); // Save focus timer settings
router.post("/session", authMiddleware, saveSession); // Save focus session
router.get("/settings", authMiddleware, getSettings); // Get focus timer settings
router.get("/sessions", authMiddleware, getSessions); // Get all focus sessions

export default router;