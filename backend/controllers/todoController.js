import { UserModel } from "../db.js";
async function getuser(id) {
    return await UserModel.findOne({ _id: id });
}
async function deleteTodo(req, res) {
    let id = req.params.id;
    const user = await getuser(req.user.id);
    user.todos = user.todos.filter(x => x.id != id);
    await user.save();
    res.json(user);
}
async function updateTodo(req, res) {
    let id = req.params.id;
    const user = await getuser(req.user.id);
    let todo = user.todos.find(x => x.id == id);
    todo.title = req.body.updatedTask;
    await user.save();
    res.json(user)
}
async function addTodo(req, res) {
    const user = await getuser(req.user.id);
    const newTodo = {
        id: user.todos.length + 1,
        title: req.body.newTask,
        completed: false,
    };
    user.todos.push(newTodo);
    await user.save();
    res.send(user);
}
async function isCompleted(req, res) {
    const id = req.params.id;
    const user = await getuser(req.user.id);
    const todo = user.todos.find(t => t.id == id);
    if (todo) {
        todo.completed = !todo.completed;
        await user.save();
        res.json(user);
    } else {
        res.status(404).json({ error: "Todo not found" });
    }
}
export { deleteTodo, updateTodo, addTodo, isCompleted }