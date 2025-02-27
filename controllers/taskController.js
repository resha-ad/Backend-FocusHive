import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.userId } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
};

export const addTask = async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, userId: req.user.userId });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error adding task", error });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.userId } });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        await task.update(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.userId } });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        await task.destroy();
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
};