import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { addTodo } from "./fetchFunctions";

export default function Home({ setLoggedIn }) {
    const [userData, setUserData] = useState({});
    const [updateTaskId, setUpdateTaskId] = useState(null);
    const [updatedTask, setUpdatedTask] = useState(null);
    const [newTask, setNewTask] = useState("")
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchUserData = async () => {
            const res = await fetch("/me", {
                method: "GET",
                headers: {
                    authorization: token,
                },
            });
            const data = await res.json();
            setUserData(data);
        };
        fetchUserData();
    }, []);

    function logout(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        setLoggedIn(false);
    }

    return (
        <div className="home">
            <div className="header">
                <h2>Hi! {userData.username}</h2>
                <button onClick={logout}>Logout</button>
            </div>
            <div className="addTask">
                <input type="text" name="task" onChange={(e) => setNewTask(e.target.value)} placeholder="Add Task" value={newTask} />
                <button onClick={() => { addTodo(newTask, setUserData); setNewTask("") }}>Add</button>
            </div>
            {userData.todos && (
                <div className="showTodo">
                    {userData.todos.map((x) => (
                        <TodoItem
                            key={x.id}
                            x={x}
                            updateTaskId={updateTaskId}
                            updatedTask={updatedTask}
                            setUpdateTaskId={setUpdateTaskId}
                            setUpdatedTask={setUpdatedTask}
                            setUserData={setUserData}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
