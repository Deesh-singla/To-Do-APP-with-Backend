import express from "express"
import { userData } from "../controllers/meController.js";
const meRouter=express.Router();

meRouter.get("/",userData);
export {meRouter}