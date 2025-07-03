import { useState } from "react";
import { deleteTodo, taskCompleted, updateTodo } from "./fetchFunctions";

export default function TodoItem({
    x,
    updateTaskId,
    updatedTask,
    setUpdateTaskId,
    setUpdatedTask,
    setUserData
}) {
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [completing, setCompleting] = useState(false);

    const handleUpdate = async () => {
        setLoadingUpdate(true);
        await updateTodo(x.id, setUserData, updatedTask);
        setUpdateTaskId(null);
        setUpdatedTask(null);
        setLoadingUpdate(false);
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        await deleteTodo(x.id, setUserData);
        setLoadingDelete(false);
    };

    const handleComplete = async (e) => {
        setCompleting(true);
        await taskCompleted(e, x.id, setUserData);
        setCompleting(false);
    };

    return (
        <div className={`task ${x.completed ? "completed" : ""}`}>
            <div className="indTask">
                <input
                    type="checkbox"
                    onClick={handleComplete}
                    disabled={completing}
                />
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
            <div className="indTask">
                {x.id !== updateTaskId ? (
                    <i
                        className="bx bx-edit-alt"
                        onClick={() => setUpdateTaskId(x.id)}
                    ></i>
                ) : (
                    <button onClick={handleUpdate} className="updatedTaskBtn" disabled={loadingUpdate}>
                        {loadingUpdate ? "Submitting..." : "Submit"}
                    </button>
                )}

                <i
                    className="bx bx-trash"
                    onClick={handleDelete}
                    style={{ pointerEvents: loadingDelete ? "none" : "auto", opacity: loadingDelete ? 0.5 : 1 }}
                ></i>
            </div>
        </div>
    );
}
