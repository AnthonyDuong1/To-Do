import "./Login.css"

function Login() {

    const LoginUser = () => {
        console.log("login")

        const Username = document.getElementById("usernameInput").value;
        const Password = document.getElementById("passwordInput").value;
        
        fetch("https://localhost:5201/api/auth/login",{
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ Username: Username, Password: Password }),
            headers: { "Content-type": "application/json" },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

    const CheckRefresh = () => {
        console.log("Refresh");

        fetch("https://localhost:5201/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

    return(
        <div className="Login-Container">
            <h1>Login</h1>
            <h2>Username</h2>
            <input className="Login-Input" id="usernameInput"></input>
            <h2>Password</h2>
            <input className="Login-Input" id="passwordInput"></input>
            <button className="Submit-Button" onClick={LoginUser}>Login</button>

            <button onClick={CheckRefresh}>Check Refresh</button>
        </div>
    )
}

export default Login