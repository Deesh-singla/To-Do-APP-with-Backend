import express from "express"
import { addUser } from "../controllers/signupController.js";

const signupRouter = express.Router();
signupRouter.post("/", addUser)

export { signupRouter } 