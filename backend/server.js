import express from "express";
import jwt from "jsonwebtoken"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();
import { signupRouter } from "./routers/signupRouter.js";
import { loginRouter } from "./routers/loginRouter.js";
import { meRouter } from "./routers/meRouter.js";
import { todoRouter } from "./routers/todoRouter.js";
import mongoose from "mongoose";
const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGODB_URI;
mongoose.connect(MONGO_URI)
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

function auth(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized"
                })
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}
app.use("/signup", signupRouter)
app.use("/login", loginRouter)
app.use("/me", auth, meRouter);
app.use("/todo", auth, todoRouter)
app.listen(PORT || 3000);