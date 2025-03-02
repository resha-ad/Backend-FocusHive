import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request

        // Check if the user is an admin
        if (req.user.isAdmin) {
            next(); // Allow access for admins
        } else {
            res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

export default authMiddleware;