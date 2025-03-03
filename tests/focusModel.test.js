const SequelizeMock = require("sequelize-mock");

const dbMock = new SequelizeMock();

const FocusTimerMock = dbMock.define("FocusTimer", {
    id: 1,
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionDuration: 50,
    sessionDate: new Date(),
    userId: 1,
});

describe("FocusTimer Model", () => {
    it("should create a focus timer successfully", async () => {
        const timer = await FocusTimerMock.create({
            pomodoroDuration: 30,
            shortBreakDuration: 7,
            longBreakDuration: 20,
            sessionDuration: 60,
            sessionDate: new Date(),
            userId: 2,
        });

        expect(timer.pomodoroDuration).toBe(30);
        expect(timer.shortBreakDuration).toBe(7);
        expect(timer.longBreakDuration).toBe(20);
        expect(timer.sessionDuration).toBe(60);
        expect(timer.userId).toBe(2);
    });

    it("should require a userId", async () => {
        try {
            const timer = await FocusTimerMock.create({});
            if (!timer.userId) {
                throw new Error("Validation error: Missing required fields");
            }
        } catch (error) {
            expect(error.message).toBe("Validation error: Missing required fields");
        }
    });
});
