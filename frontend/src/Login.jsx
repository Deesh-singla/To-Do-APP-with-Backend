import { useState } from "react"
import { fetchData } from "./fetchFunctions";

export default function Login({ setMethod, setLoggedIn }) {
    const [formData, setFormData] = useState({})
    const [res, setRes] = useState({})
    const [loading, setLoading] = useState(false);
    function changeEventHandler(e) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    async function handleClick(e) {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setRes({ error: "*Please fill all fields" });
            return;
        }
        setLoading(true);
        let response = await fetchData("/login", formData, "post");
        if (response.token) {
            localStorage.setItem("token", response.token);
            setLoggedIn(true);
        }
        else setRes(response)
        setLoading(false);
    }
    return (
        <form>
            <div>
                <input type="text" className="username" placeholder="Username" name="username" onChange={(e) => changeEventHandler(e)} />
            </div>
            <div>
                <input type="password" className="password" placeholder="Password" name="password" onChange={(e) => changeEventHandler(e)} />
            </div>
            <button type="submit" onClick={e => handleClick(e)}>{loading ? "loading ..." : "Login"}</button>
            <p>Not a Member? <span onClick={() => setMethod("Signup")} style={{ cursor: "pointer", color: "#007bff" }}>signup now</span></p>
            {res.error && <p style={{ color: "red" }}>{res.error}</p>}
        </form>
    )
}
