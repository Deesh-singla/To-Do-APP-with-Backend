// import { useState, useEffect } from "react";
// import TodoItem from "./TodoItem";
// import { addTodo } from "./fetchFunctions";

// export default function Home({ setLoggedIn }) {
//     const [userData, setUserData] = useState({});
//     const [updateTaskId, setUpdateTaskId] = useState(null);
//     const [updatedTask, setUpdatedTask] = useState(null);
//     const [newTask, setNewTask] = useState("")
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const fetchUserData = async () => {
//             const res = await fetch("https://to-do-app-with-backend.onrender.com/me", {
//                 method: "GET",
//                 headers: {
//                     authorization: token,
//                 },
//             });
//             const data = await res.json();
//             if(data==null) setUserData({username:" "});
//             else setUserData(data);
//         };
//         fetchUserData();
//     }, []);

//     function logout(e) {
//         e.preventDefault();
//         localStorage.removeItem("token");
//         setLoggedIn(false);
//     }

//     return (
//         <div className="home">
//             <div className="header">
//                 <h2>Hi! {userData.username}</h2>
//                 <button onClick={logout}>Logout</button>
//             </div>
//             <div className="addTask">
//                 <input type="text" name="task" onChange={(e) => setNewTask(e.target.value)} placeholder="Add Task" value={newTask} />
//                 <button onClick={() => { addTodo(newTask, setUserData); setNewTask("") }}>Add</button>
//             </div>
//             {userData.todos && (
//                 <div className="showTodo">
//                     {userData.todos.map((x) => (
//                         <TodoItem
//                             key={x.id}
//                             x={x}
//                             updateTaskId={updateTaskId}
//                             updatedTask={updatedTask}
//                             setUpdateTaskId={setUpdateTaskId}
//                             setUpdatedTask={setUpdatedTask}
//                             setUserData={setUserData}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { addTodo } from "./fetchFunctions";

export default function Home({ setLoggedIn }) {
    const [userData, setUserData] = useState({});
    const [updateTaskId, setUpdateTaskId] = useState(null);
    const [updatedTask, setUpdatedTask] = useState(null);
    const [newTask, setNewTask] = useState("");
    const [adding, setAdding] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token");
        const fetchUserData = async () => {
            const res = await fetch("https://to-do-app-with-backend.onrender.com/me", {
                method: "GET",
                headers: {
                    authorization: token,
                },
            });
            const data = await res.json();
            if (data == null) setUserData({ username: " " });
            else setUserData(data);
            setLoading(false);
        };
        fetchUserData();
    }, []);

    function logout(e) {
        e.preventDefault();
        setLoggingOut(true);
        setTimeout(() => {
            localStorage.removeItem("token");
            setLoggedIn(false);
        }, 1000); // simulate delay
    }

    async function handleAddTask() {
        setAdding(true);
        await addTodo(newTask, setUserData);
        setNewTask("");
        setAdding(false);
    }

    return (
        <div className="home">
            <div className="header">
                <h2>Hi! {loading ? "User" : userData.username} </h2>
                <button onClick={logout}>{loggingOut ? "Logging out..." : "Logout"}</button>
            </div>
            <div className="addTask">
                <input
                    type="text"
                    name="task"
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add Task"
                    value={newTask}
                />
                <button onClick={handleAddTask} disabled={adding}>
                    {adding ? "Adding..." : "Add"}
                </button>
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
