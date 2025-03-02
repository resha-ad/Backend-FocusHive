// controllers/helpFormController.js
import HelpForm from "../models/HelpForm.js";

// Submit Help Form
export const submitHelpForm = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newHelpForm = await HelpForm.create({ name, email, message });
        res.status(201).json(newHelpForm);
    } catch (error) {
        res.status(500).json({ message: "Error submitting help form", error });
    }
};

// Get all Help Forms for Admin Dashboard
export const getAllHelpForms = async (req, res) => {
    try {
        const helpForms = await HelpForm.findAll();
        res.status(200).json(helpForms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching help forms", error });
    }
};

// Update Remarks by Admin
export const updateRemarks = async (req, res) => {
    const { id } = req.params;
    const { remarks } = req.body;

    try {
        const helpForm = await HelpForm.findByPk(id);
        if (!helpForm) {
            return res.status(404).json({ message: "Help form not found" });
        }

        helpForm.remarks = remarks;
        await helpForm.save();

        res.status(200).json(helpForm);
    } catch (error) {
        res.status(500).json({ message: "Error updating remarks", error });
    }
};
// Delete Help Form by Admin
export const deleteHelpForm = async (req, res) => {
    const { id } = req.params;

    try {
        const helpForm = await HelpForm.findByPk(id);
        if (!helpForm) {
            return res.status(404).json({ message: "Help form not found" });
        }

        await helpForm.destroy();
        res.status(200).json({ message: "Help form deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting help form", error });
    }
};