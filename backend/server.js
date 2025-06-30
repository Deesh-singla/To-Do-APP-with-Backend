import express from "express";
import jwt from "jsonwebtoken"
import cors from "cors";
import { signupRouter } from "./routers/signupRouter.js";
import { loginRouter } from "./routers/loginRouter.js";
import { meRouter } from "./routers/meRouter.js";
import { todoRouter } from "./routers/todoRouter.js";
export const JWT_SECRET = "DEESH'S TODO"
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
export let users = [];

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
app.use("/me", meRouter);
app.use("/todo", auth, todoRouter)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(3000);