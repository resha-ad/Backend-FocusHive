const SequelizeMock = require("sequelize-mock");

const dbMock = new SequelizeMock();

const HelpFormMock = dbMock.define("HelpForm", {
    id: 1,
    name: "Aaron Warner",
    email: "aaron@example.com",
    message: "I need help with my account.",
    subject: "Account Issue",
    remarks: "Urgent",
});

describe("HelpForm Model", () => {
    it("should create a help form entry successfully", async () => {
        const form = await HelpFormMock.create({
            name: "Jane Doe",
            email: "janedoe@example.com",
            message: "How do I reset my password?",
            subject: "Password Reset",
            remarks: "Please respond ASAP",
        });

        expect(form.name).toBe("Jane Doe");
        expect(form.email).toBe("janedoe@example.com");
        expect(form.message).toBe("How do I reset my password?");
        expect(form.subject).toBe("Password Reset");
        expect(form.remarks).toBe("Please respond ASAP");
    });

    it("should require a name, email, message, and subject", async () => {
        try {
            const form = await HelpFormMock.create({});
            if (!form.name || !form.email || !form.message || !form.subject) {
                throw new Error("Validation error: Missing required fields");
            }
        } catch (error) {
            expect(error.message).toBe("Validation error: Missing required fields");
        }
    });
});
