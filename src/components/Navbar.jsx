import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear(); // يمسح كل بيانات الجلسة
    navigate("/", { replace: true });
  };

  const goDashboard = () => {
    if (role === "admin") {
      navigate("/admin-dashboard");
    } else if (role === "faculty") {
      navigate("/faculty-dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <h2 style={{ cursor: "pointer" }} onClick={goDashboard}>
        Attendance System
      </h2>

      <div className="nav-links">
        {role === "admin" && (
          <>
            <button onClick={() => navigate("/addfaculty")}>
              Add Faculty
            </button>

            <button onClick={() => navigate("/viewfaculty")}>
              View Faculty
            </button>
          </>
        )}

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;