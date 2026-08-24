import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const response = await fetch(
        "https://student-management-system-1-wbm2.onrender.com/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save login status
        localStorage.setItem("isLoggedIn", "true");

        // Save username
        localStorage.setItem(
          "username",
          data.username || username
        );

        alert("Login successful!");

        // Go to dashboard
        navigate("/");
      } else {
        alert(
          data.message || "Invalid username or password"
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Cannot connect to server. Please try again."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Logo */}
        <div className="login-icon">
          🎓
        </div>

        {/* Heading */}
        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Student Management System
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          {/* Username */}
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

          {/* Password */}
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

          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

        {/* Login information */}
        <p className="login-demo">
          Login using your registered account
        </p>

        {/* Register Link */}
        <div className="register-link">

          Don't have an account?{" "}

          <Link to="/register">
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;
