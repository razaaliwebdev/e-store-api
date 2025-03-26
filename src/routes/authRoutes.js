import express from "express";
import registerController from "../controllers/auth/registerController.js";
import loginContoller from '../controllers/auth/loginController.js';

const authRouter = express.Router();

// Register Route
authRouter.post("/register", registerController);

// Login Route
authRouter.post("/login", loginContoller);

export default authRouter;

