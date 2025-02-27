// adminController.js
// import { findAll, destroy } from "../models/User.js";
// import { findAll as _findAll } from "../models/HelpForm.js";

// export async function getAllUsers(req, res) {
//     try {
//         const users = await findAll();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching users" });
//     }
// }

// export async function deleteUser(req, res) {
//     try {
//         const { userId } = req.params;
//         await destroy({ where: { id: userId } });
//         res.json({ message: "User deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting user" });
//     }
// }

// export async function getAllHelpForms(req, res) {
//     try {
//         const helpForms = await _findAll();
//         res.json(helpForms);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching help forms" });
//     }
// }