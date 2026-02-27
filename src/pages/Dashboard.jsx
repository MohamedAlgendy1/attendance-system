import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page">
      
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-box">

          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
            Welcome Admin 👋
          </h2>

          <p style={{ textAlign: "center", opacity: "0.8" }}>
            Manage students attendance easily from here
          </p>

          <div className="dashboard-actions">

            <div className="action-card">
              <h3>Add Faculty</h3>
              <p>
                Add a new faculty to system.
              </p>
              <button onClick={() => navigate("/addfaculty")}>
                Add Faculty
              </button>
            </div>

            <div className="action-card">
              <h3>View Faculty</h3>
              <p>
                Efficiently view faculty data and details.
              </p>
              <button onClick={() => navigate("/viewfaculty")}>
                View Faculty
              </button>
            </div>

          </div>

        </div>
      </div>

      <footer className="footer">
        © 2025 Attendify
      </footer>

    </div>
  );
}

export default Dashboard;