import mongoose from "mongoose";
import { boolean } from "zod";
const Schema = mongoose.Schema;
const todoSchema = new mongoose.Schema({
    id: Number,
    title: String,
    completed: Boolean,
});

const User = new Schema({
    username: { type: String, unique: true },
    password: String,
    todos: [todoSchema],
})

const UserModel = mongoose.model("users", User)
export { UserModel}