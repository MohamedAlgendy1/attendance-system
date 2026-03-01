import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    navigate("/");
    return null;
  }

  const user = {
    name: role === "admin" ? "Admin" : "Faculty",
    role: role
  };

  return (
    <div className="page">
      
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-box">

          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
            Welcome {user.name} 👋
          </h2>

          <p style={{ textAlign: "center", opacity: "0.8" }}>
            Manage system operations from here
          </p>

          {user.role === "admin" && (
            <div className="dashboard-actions">

              <div className="action-card">
                <h3>Add Faculty</h3>
                <button onClick={() => navigate("/addfaculty")}>
                  Add Faculty
                </button>
              </div>

              <div className="action-card">
                <h3>View Faculty</h3>
                <button onClick={() => navigate("/viewfaculty")}>
                  View Faculty
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      <footer className="footer">
        © 2025 Attendify
      </footer>

    </div>
  );
}

export default Dashboard;