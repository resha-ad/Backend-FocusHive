// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Signup
export const signup = async (req, res) => {
    const { fullName, username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the provided email and password match the admin credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Create or find the admin user
            let adminUser = await User.findOne({ where: { email: process.env.ADMIN_EMAIL } });

            if (!adminUser) {
                // If the admin user doesn't exist, create one
                adminUser = await User.create({
                    fullName: "Admin",
                    username: "admin",
                    email: process.env.ADMIN_EMAIL,
                    password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10), // Hash the admin password
                    isAdmin: true, // Set as admin
                });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: adminUser.id, isAdmin: true }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            return res.status(200).json({ user: adminUser, token });
        }

        // For regular users
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};