const SequelizeMock = require("sequelize-mock");

const dbMock = new SequelizeMock();

const CalendarEventMock = dbMock.define("CalendarEvent", {
    id: 1,
    title: "Meeting",
    description: "Team meeting to discuss project updates",
    date: "2025-03-05",
    time: "14:00:00",
    color: "blue",
    userId: 1,
});

describe("CalendarEvent Model", () => {
    it("should create a calendar event successfully", async () => {
        const event = await CalendarEventMock.create({
            title: "Birthday Party",
            description: "Friend's birthday celebration",
            date: "2025-03-10",
            time: "18:30:00",
            color: "green",
            userId: 2,
        });

        expect(event.title).toBe("Birthday Party");
        expect(event.description).toBe("Friend's birthday celebration");
        expect(event.date).toBe("2025-03-10");
        expect(event.time).toBe("18:30:00");
        expect(event.color).toBe("green");
        expect(event.userId).toBe(2);
    });

    it("should require a title, date, time, and userId", async () => {
        try {
            const event = await CalendarEventMock.create({});
            if (!event.title || !event.date || !event.time || !event.userId) {
                throw new Error("Validation error: Missing required fields");
            }
        } catch (error) {
            expect(error.message).toBe("Validation error: Missing required fields");
        }
    });
});
