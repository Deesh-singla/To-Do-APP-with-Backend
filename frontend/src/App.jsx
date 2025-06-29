import "./App.css"
import { useState } from "react"
import AuthBox from "./AuthBox";
import { useEffect } from "react";
import Home from "./Home";
export default function App() {
  const [method, setMethod] = useState("Signup");
  const [loggedin, setLoggedIn] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
    else return;
  }, [])
  return (
    <div className="app">
      <header className="app-header">
        <h1>To-Do App</h1>
      </header>
      <main className="app-content">
        {!loggedin ? <AuthBox method={method} setMethod={setMethod} setLoggedIn={setLoggedIn} />
        : <Home setLoggedIn={setLoggedIn} />}
      </main>
    </div>
  )
}
