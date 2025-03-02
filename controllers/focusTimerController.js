// controllers/focusTimerController.js
import FocusTimer from "../models/FocusTimer.js";

// Save focus timer settings
export const saveSettings = async (req, res) => {
    const { pomodoroDuration, shortBreakDuration, longBreakDuration } = req.body;

    try {
        console.log("Request body:", req.body); // Log the request body
        console.log("User ID:", req.user.userId); // Log the user ID

        // Update or create focus timer settings
        const [focusTimer, created] = await FocusTimer.findOrCreate({
            where: { userId: req.user.userId },
            defaults: { pomodoroDuration, shortBreakDuration, longBreakDuration, userId: req.user.userId },
        });

        if (!created) {
            focusTimer.pomodoroDuration = pomodoroDuration;
            focusTimer.shortBreakDuration = shortBreakDuration;
            focusTimer.longBreakDuration = longBreakDuration;
            await focusTimer.save();
        }
        res.status(200).json({ message: "Settings saved successfully", focusTimer });
    } catch (error) {
        console.error("Error saving settings:", error); // Log the error
        res.status(500).json({ message: "Error saving settings", error });
    }
};

// Save focus session
export const saveSession = async (req, res) => {
    const { sessionDuration } = req.body;

    try {
        const focusSession = await FocusTimer.create({
            userId: req.user.userId,
            sessionDuration,
        });

        res.status(201).json({ message: "Session saved successfully", focusSession });
    } catch (error) {
        res.status(500).json({ message: "Error saving session", error });
    }
};

// Get focus timer settings
export const getSettings = async (req, res) => {
    try {
        const focusTimer = await FocusTimer.findOne({ where: { userId: req.user.userId } });

        if (!focusTimer) {
            // Return default settings if no record is found
            return res.status(200).json({
                focusTimer: {
                    pomodoroDuration: 25,
                    shortBreakDuration: 5,
                    longBreakDuration: 15,
                },
            });
        }

        res.status(200).json({ focusTimer });
    } catch (error) {
        res.status(500).json({ message: "Error fetching settings", error });
    }
};

// Get all focus sessions for a user
export const getSessions = async (req, res) => {
    try {
        const sessions = await FocusTimer.findAll({
            where: { userId: req.user.userId },
            attributes: ["sessionDuration", "sessionDate"],
        });

        res.status(200).json({ sessions });
    } catch (error) {
        res.status(500).json({ message: "Error fetching sessions", error });
    }
};

// Get a specific focus session by ID
export const getSessionById = async (req, res) => {
    try {
        const session = await FocusTimer.findOne({
            where: { id: req.params.id, userId: req.user.userId },
        });

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        res.status(200).json({ session });
    } catch (error) {
        res.status(500).json({ message: "Error fetching session", error });
    }
};