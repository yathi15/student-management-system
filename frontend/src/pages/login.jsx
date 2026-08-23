import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleLogin = async (e) => {

    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username: username,
            password: password
          })
        }
      );


      const data = await response.json();


      if (response.ok) {

        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem(
          "username",
          data.username || username
        );

        alert("Login successful!");

        navigate("/");

      } else {

        alert(
          data.message || "Invalid username or password"
        );

      }

    } catch (error) {

      console.error("Login error:", error);

      alert("Cannot connect to Flask server");

    }
  };


  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-icon">
          🎓
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Student Management System
        </p>


        <form onSubmit={handleLogin}>

          <div className="login-form-group">

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>


          <div className="login-form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>


        <p className="login-demo">
          Login using your registered account
        </p>

      </div>

    </div>

  );
}


export default Login;
