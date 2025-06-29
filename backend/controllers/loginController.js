import { JWT_SECRET, users } from "../server.js";
import jwt from "jsonwebtoken"
function findUser(username, password) {
    let user = users.find(x => x.username == username && x.password == password);
    return user;
}

function loginUser(req, res) {
    let { username, password } = req.body;
    let user = findUser(username, password);
    if (user) {
        let token = jwt.sign({ username: user.username }, JWT_SECRET)
        res.json({ token: token })
    }
    else res.json({ error: "*wrong username or password" })

}
export { loginUser }