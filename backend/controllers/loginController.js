import { JWT_SECRET } from "../server.js";
import jwt from "jsonwebtoken"
import { UserModel } from "../db.js";
import bcrypt from "bcrypt";
import { z } from "zod"

const requiredBody = z.object({
    username: z.string().min(1, "*username is required"),
    password: z.string().min(1, "*password is required"),
});

async function findUser(username) {
    return await UserModel.findOne({ username });
}

async function verifyPass(user, password) {
    return await bcrypt.compare(password, user.password);
}

async function loginUser(req, res) {

    const parsed = requiredBody.safeParse(req.body);
    if (!parsed.success) {
        return res.json({ error: parsed.error.issues[0].message });
    }

    let { username, password } = parsed.data;
    try {
        let user = await findUser(username);

        if (user && await verifyPass(user, password)) {
            let token = jwt.sign({ id: user._id }, JWT_SECRET)
            return res.json({ token: token })
        }

        else return res.json({ error: "*wrong username or password" })
    } catch (err) {
        return res.status(500).json({ error: "*internal server error" });
    }

}
export { loginUser }