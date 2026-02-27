import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ================= ADMIN LOGIN =================
    if (role === "admin") {
      if (username === "admin" && password === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "admin");

        setIsSuccess(true);
        setMessage("Login successful ✔");

        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1000);
      } else {
        setIsSuccess(false);
        setMessage("Invalid Admin credentials");
      }
    }

    // ================= FACULTY LOGIN =================
    if (role === "faculty") {
      if (username === "1111" && password === "1111") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "faculty");

        setIsSuccess(true);
        setMessage("Login successful ✔");

        setTimeout(() => {
          navigate("/faculty-dashboard");
        }, 1000);
      } else {
        setIsSuccess(false);
        setMessage("Invalid Faculty credentials");
      }
    }
  };

  return (
    <div className="page">
      <div className="login-container">
        <div className="login-card">

          <h2>
            {role === "admin" ? "Admin Login" : "Faculty Login"}
          </h2>

          {/* Role Selector */}
          <div style={{ marginBottom: "15px" }}>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="role-select"
            >
              <option value="admin">Admin Login</option>
              <option value="faculty">Faculty Login</option>
            </select>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder={role === "admin" ? "Username" : "Phone Number"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          {message && (
            <p
              style={{
                color: isSuccess ? "#22c55e" : "#ef4444",
                marginTop: "15px",
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              {message}
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default Login;