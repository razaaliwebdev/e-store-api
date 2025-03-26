import User from '../../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import "dotenv/config";

const registerController = async (req, res) => {
    try {
        // Validate the fields
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All the fields are required."
            });
        };

        // Check the exist user in the database
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist."
            });
        };

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({ name, email, password: hashedPassword });
        user.save();

        // Token
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: "7d" });

        return res.status(201).json({
            token,
            user,
            success: false,
            message: "User register successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false,
        });
    }
};

export default registerController