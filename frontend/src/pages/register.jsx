import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (!username || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://student-management-system-1-wbm2.onrender.com/register",
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
        alert("Account created successfully!");

        // Go to login page
        navigate("/login");
      } else {
        alert(
          data.message || "Registration failed"
        );
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      alert("Cannot connect to Flask server");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-icon">
          🎓
        </div>

        <h1>Create Account</h1>

        <p className="login-subtitle">
          Student Management System
        </p>

        <form onSubmit={handleRegister}>

          {/* Username */}
          <div className="login-form-group">

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Create username"
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
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          {/* Confirm Password */}
          <div className="login-form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="login-button"
          >
            Create Account
          </button>

        </form>

        {/* Login Link */}
        <p className="register-link">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;
