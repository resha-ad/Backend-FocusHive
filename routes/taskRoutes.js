import express from "express";
import { getTasks, addTask, updateTask, deleteTask, getTasksForCalendar } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.get("/calendar", getTasksForCalendar); // get task for calendar route
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;