import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ لو المستخدم already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (token && savedRole) {
      if (savedRole === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/faculty-dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // 🔥 هنا لاحقًا هتحط axios request حقيقي
      const fakeResponse = {
        token: "fake-jwt-token",
        role: role,
      };

      localStorage.setItem("token", fakeResponse.token);
      localStorage.setItem("role", fakeResponse.role);

      setIsSuccess(true);
      setMessage("Login successful ✔");

      // 👇 يرجعه للصفحة اللي كان عايز يدخلها
      const redirectPath =
        location.state?.from?.pathname ||
        (fakeResponse.role === "admin"
          ? "/admin-dashboard"
          : "/faculty-dashboard");

      setTimeout(() => {
        navigate(redirectPath, { replace: true });
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