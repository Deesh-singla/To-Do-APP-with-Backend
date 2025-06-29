import Signup from './Signup'
import Login from './Login'

export default function AuthBox({ method, setMethod, setLoggedIn }) {
    return (
        <div className="box">
            <h1>{method} Form</h1>
            <div className="method-selector">
                <div onClick={() => setMethod("Signup")} className={`signup-button method-button ${method === "Signup" ? "active" : ""}`} >Signup</div>
                <div onClick={() => setMethod("Login")} className={`login-button method-button ${method === "Login" ? "active" : ""}`} >Login</div>
            </div>
            <div className="method-div" style={{ flex: 1 }}>
                {method === "Signup" ? <Signup /> : <Login setMethod={setMethod} setLoggedIn={setLoggedIn} />}
            </div>
        </div>
    )
}
