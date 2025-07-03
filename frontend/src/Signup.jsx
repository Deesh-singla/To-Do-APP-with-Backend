import { useState } from "react"
import { fetchData } from "./fetchFunctions";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({})
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
    let response = await fetchData("/signup", formData, "post");
    setRes(response);
    setLoading(false);
  }
  return (
    <form>
      <div>
        <input type="text" className="username" placeholder="Username" name="username" onChange={(e) => changeEventHandler(e)} required />
      </div>
      <div>
        <input type="password" className="password" placeholder="Password" name="password" onChange={(e) => changeEventHandler(e)} required />
      </div>
      <button type="submit" onClick={(e) => handleClick(e)}>{loading ? "loading ..." : "Signup"}</button>
      {res.message ? <p>{res.message}</p> : <p style={{ color: "red" }}>{res.error}</p>}
    </form>
  )
}
