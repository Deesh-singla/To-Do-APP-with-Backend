import { UserModel } from "../db.js";
import { z } from "zod"
import bcrypt from "bcrypt"

const requiredBody = z.strictObject({
    username: z.string().min(5).max(20),
    password: z.string().min(5).max(20).regex(/[!@#$%^&*?]/, "*password should contain a special character")
})

async function userExists(username) {
    const user = await UserModel.findOne({ username });
    if (user == null) return false;
    return true;
}

async function createUser(obj) {
    const hashedPass = await bcrypt.hash(obj.password, 10);
    await UserModel.create({ username: obj.username, password: hashedPass })
}

async function addUser(req, res) {
    const parsedData = requiredBody.safeParse(req.body);
    if (!parsedData.success) {
        return res.json({ error: "*" + parsedData.error.issues[0].message });
    }

    const { username} = parsedData.data;

    if (await userExists(username)) {
        return res.json({ error: "*user already exists" });
    }

    else {
        try {
            await createUser(req.body);
            return res.json({ message: "user Added Successfully" });
        } catch (error) {
            return res.status(500).json({ error: "*internal server error" });
        }
    }

}
export { addUser }  