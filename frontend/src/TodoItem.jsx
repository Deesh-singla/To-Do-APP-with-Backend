import { deleteTodo, taskCompleted, updateTodo } from "./fetchFunctions";

export default function TodoItem({
    x,
    updateTaskId,
    updatedTask,
    setUpdateTaskId,
    setUpdatedTask,
    setUserData
}) {
    const handleUpdate = () => {
        updateTodo(x.id, setUserData, updatedTask);
        setUpdateTaskId(null);
        setUpdatedTask(null);
    };

    return (
        <div className={`task ${x.completed ? "completed" : ""}`}>
            <div className=" indTask">
                <input type="checkbox" onClick={(e) => taskCompleted(e, x.id, setUserData)} />
                {x.id === updateTaskId ? (
                    <input
                        type="text"
                        className="updateTask"
                        placeholder={x.title}
                        onChange={(e) => setUpdatedTask(e.target.value)}
                    />
                ) : (
                    <p style={{ fontSize: "larger" }}>{x.title}</p>
                )}
            </div>
            <div className=" indTask">
                {x.id !== updateTaskId ? (
                    <i
                        className="bx bx-edit-alt"
                        onClick={() => setUpdateTaskId(x.id)}
                    ></i>
                ) : (
                    <button onClick={handleUpdate} className="updatedTaskBtn">submit</button>
                )}

                <i
                    className="bx bx-trash"
                    onClick={() => deleteTodo(x.id, setUserData)}
                ></i>
            </div>
        </div>
    );
}
