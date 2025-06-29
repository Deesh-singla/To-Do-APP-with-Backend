import { users } from "../server.js";
function userExists(username) {
    const user = users.find(x => x.username === username);
    if (user) return true;
    return false;
}
function addUser(req, res) {
    const { username, password } = req.body;
    let isUserExists = userExists(username);
    if (isUserExists) {
        res.json({ error: "*user already exists" });
    }
    else {
        users.push(req.body);
        res.json({ message: "user Added Successfully" });
    }
}
export { addUser }  