import { UserModel } from "../db.js";

async function getData(id) {
    return await UserModel.findOne({ _id: id });
}
async function userData(req, res) {
    try {
        const { id } = req.user
        let user = await getData(id);
        res.json(user);
    }
    catch (err) {
        res.json({ err: "something went wrong" })
    }
}
export { userData };