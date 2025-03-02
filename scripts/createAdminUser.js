// scripts/createAdminUser.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { db } from '../config/db.js'; // Import your database connection

dotenv.config();

const createAdminUser = async () => {
    try {
        // Connect to the database
        await db();

        // Create the admin user
        const adminUser = await User.create({
            fullName: "Admin",
            username: "admin",
            email: "admin123@gmail.com",
            password: await bcrypt.hash("admin123", 10), // Hash the admin password
            isAdmin: true, // Set as admin
        });

        console.log("Admin user created:", adminUser);
    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        process.exit(); // Exit the script after execution
    }
};

createAdminUser();