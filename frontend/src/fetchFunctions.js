let fetchData = async (endpoint, data, method) => {
    let res = await fetch(`https://to-do-app-with-backend.onrender.com${endpoint}`, {
        method: method,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    })
    let d = await res.json();
    return d;
}
let deleteTodo = async (id, setUserData) => {
    let token = localStorage.getItem("token");
    let res = await fetch(`https://to-do-app-with-backend.onrender.com/todo/${id}`, {
        method: "delete",
        headers: {
            "authorization": token,
        }
    })
    let d = await res.json();
    setUserData(d);
}
let updateTodo = async (id, setUserData, updatedTask) => {
    let token = localStorage.getItem("token");
    let res = await fetch(`https://to-do-app-with-backend.onrender.com/todo/${id}`, {
        method: "put",
        headers: {
            "authorization": token,
            "content-type": "application/json",
        },
        body: JSON.stringify({ updatedTask: updatedTask })
    })
    let d = await res.json();
    setUserData(d);
}
let addTodo = async (newTask, setUserData) => {
    let token = localStorage.getItem("token");
    let res = await fetch(`https://to-do-app-with-backend.onrender.com/todo`, {
        method: "post",
        headers: {
            "authorization": token,
            "content-type": "application/json",
        },
        body: JSON.stringify({ newTask: newTask })
    })
    let d = await res.json();
    setUserData(d);
}
let taskCompleted = async (e, id, setUserData) => {
    let token = localStorage.getItem("token");
    let res = await fetch(`https://to-do-app-with-backend.onrender.com/todo/toggle/${id}`, {
        method: "post",
        headers: {
            "authorization": token,
            "content-type": "application/json",
        },
    })
    let d = await res.json();
    setUserData(d);
}
export { fetchData, deleteTodo, updateTodo, addTodo, taskCompleted };