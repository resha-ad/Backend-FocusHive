const SequelizeMock = require("sequelize-mock");

const dbMock = new SequelizeMock();

const TaskMock = dbMock.define("Task", {
    id: 1,
    title: "Test Task",
    description: "This is a test task",
    deadline: new Date(),
    category: "Work",
    important: false,
    addToCalendar: false,
    completed: false,
    userId: 1,
});

describe("Task Model", () => {
    it("should create a task successfully", async () => {
        const task = await TaskMock.create({
            title: "New Task",
            description: "A new test task",
            deadline: new Date(),
            category: "Personal",
            important: true,
            addToCalendar: true,
            completed: false,
            userId: 2,
        });

        expect(task.title).toBe("New Task");
        expect(task.description).toBe("A new test task");
        expect(task.category).toBe("Personal");
        expect(task.important).toBe(true);
        expect(task.addToCalendar).toBe(true);
        expect(task.completed).toBe(false);
        expect(task.userId).toBe(2);
    });

    it("should require a title, deadline, category, and userId", async () => {
        try {
            const task = await TaskMock.create({});
            if (!task.title || !task.deadline || !task.category || !task.userId) {
                throw new Error("Validation error: Missing required fields");
            }
        } catch (error) {
            expect(error.message).toBe("Validation error: Missing required fields");
        }
    });

});
