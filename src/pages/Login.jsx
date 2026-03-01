import { useState } from "react";
import { useNavigate } from "react-router-dom";
// لاحقًا هنستخدم axios
// import axios from "axios";

function Login() {
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // 👇 ده هيبقى API Call حقيقي
      /*
      const response = await axios.post("/api/auth/login", {
        username,
        password,
        role
      });

      const { token, role: userRole } = response.data;
      */

      // مؤقتًا Simulation
      const fakeResponse = {
        token: "fake-jwt-token",
        role: role
      };

      localStorage.setItem("token", fakeResponse.token);
      localStorage.setItem("role", fakeResponse.role);

      setIsSuccess(true);
      setMessage("Login successful ✔");

      setTimeout(() => {
        if (fakeResponse.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/faculty-dashboard");
        }
      }, 800);

    } catch {
      setIsSuccess(false);
      setMessage("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="login-container">
        <div className="login-card">

          <h2>
            {role === "admin" ? "Admin Login" : "Faculty Login"}
          </h2>

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
              placeholder="Username / Phone"
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

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
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