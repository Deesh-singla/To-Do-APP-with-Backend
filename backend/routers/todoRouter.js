import express from "express"
import { addTodo, deleteTodo,isCompleted,updateTodo } from "../controllers/todoController.js";
const todoRouter=express.Router();
todoRouter.delete("/:id",deleteTodo);
todoRouter.put("/:id",updateTodo)
todoRouter.post("/",addTodo)
todoRouter.post("/toggle/:id",isCompleted)
export {todoRouter}