import CalendarEvent from "../models/CalendarEvent.js";
import Task from "../models/Task.js";

// Get all events and tasks marked as "Add to Calendar"
export const getEvents = async (req, res) => {
    try {
        const events = await CalendarEvent.findAll({ where: { userId: req.user.userId } });
        const tasks = await Task.findAll({
            where: {
                userId: req.user.userId,
                addToCalendar: true,
            },
        });

        // Combine events and tasks
        const calendarData = [
            ...events.map(event => ({
                id: event.id,
                title: event.title,
                description: event.description,
                date: event.date,
                time: event.time,
                color: event.color,
                type: "event",
            })),
            ...tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                date: task.deadline,
                time: "00:00", // Default time for tasks
                color: "blue", // Different color for tasks
                type: "task",
            })),
        ];

        res.status(200).json(calendarData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching calendar data", error });
    }
};

// Add a new event
export const addEvent = async (req, res) => {
    try {
        const { title, description, date, time, color } = req.body;
        const event = await CalendarEvent.create({ title, description, date, time, color, userId: req.user.userId });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error adding event", error });
    }
};

// Update an event
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await CalendarEvent.findOne({ where: { id, userId: req.user.userId } });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        await event.update(req.body);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error });
    }
};

// Delete an event
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await CalendarEvent.findOne({ where: { id, userId: req.user.userId } });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        await event.destroy();
        res.status(200).json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
};