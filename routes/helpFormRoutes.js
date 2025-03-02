// routes/helpFormRoutes.js
import express from "express";
import { submitHelpForm, getAllHelpForms, updateRemarks } from "../controllers/helpFormController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit Help Form
router.post("/submit", submitHelpForm);

// Get all Help Forms for Admin Dashboard (protected route)
router.get("/all", authMiddleware, getAllHelpForms);

// Update Remarks by Admin (protected route)
router.put("/update-remarks/:id", authMiddleware, updateRemarks);

// Delete Help Form by Admin (protected route)
router.delete("/delete/:id", authMiddleware, deleteHelpForm);

export default router;