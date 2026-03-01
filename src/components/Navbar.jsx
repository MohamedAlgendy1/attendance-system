import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2
        style={{ cursor: "pointer" }}
        onClick={() =>
          role === "admin"
            ? navigate("/admin-dashboard")
            : navigate("/faculty-dashboard")
        }
      >
       attendance
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