import User from "../../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";

const loginContoller = async (req, res) => {
    try {
        //  Validate the Fields
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required."
            });
        };

        // Check Exist User
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        };

        // Compare the password
        const isMatch = await bcrypt.compare(password, existUser.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        };

        // Token
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ userId: existUser._id, email: existUser.email }, secret, { expiresIn: "7d" });

        return res.status(200).json({ token, success: true, message: "User Login Successfully." });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        });
    }
}

export default loginContoller;