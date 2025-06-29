import { users } from "../server.js"
function deleteTodo(req, res) {
    let id = req.params.id;
    const user = users.find(x => x.username === req.user.username)
    user.todos = user.todos.filter(x => x.id != id);
    res.json(user);
}
function updateTodo(req, res) {
    let id = req.params.id;
    const user = users.find(x => x.username === req.user.username);
    let todo = user.todos.find(x => x.id == id);
    todo.title = req.body.updatedTask
    res.json(user)
}
function addTodo(req, res) {
    const user = users.find(x => x.username === req.user.username);
    if (!user.todos) {
        user.todos = []
    }
    const newTask = { id: user.todos.length + 1, title: req.body.newTask, completed: false };
    user.todos.push(newTask);
    res.send(user);
}
function isCompleted(req, res) {
    const id = req.params.id;
    const user = users.find(x => x.username === req.user.username);
    const todo = user.todos.find(t => t.id == id);
    if (todo) {
        todo.completed = !todo.completed;
        res.json(user);
    } else {
        res.status(404).json({ error: "Todo not found" });
    }

}
export { deleteTodo, updateTodo, addTodo, isCompleted }