import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function FacultyDashboard() {
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setError("Permission denied or location unavailable");
        }
      );
    };

    getLocation();
  }, []);

  return (
    <div className="page">
      <Navbar />

      <div className="dashboard-container">

        {/* ===== Location Box ===== */}
        <div className="location-box">
          <h3>Faculty Location</h3>

          {error && <p>{error}</p>}

          {location ? (
            <p>
              Latitude: {location.lat} <br />
              Longitude: {location.lng}
            </p>
          ) : (
            !error && <p>Getting location...</p>
          )}
        </div>

        {/* ===== Cards ===== */}
        <div className="faculty-grid">

          <div className="faculty-card">
            <h3>Add Student</h3>
            <p>Add a new student to the system.</p>
            <button onClick={() => navigate("/add-student")}>
              Add
            </button>
          </div>

          <div className="faculty-card">
            <h3>View Students</h3>
            <p>View and manage student details.</p>
            <button onClick={() => navigate("/view-students")}>
              View
            </button>
          </div>

          <div className="faculty-card">
            <h3>Start Lecture</h3>
            <p>Schedule a new lecture session.</p>
            <button onClick={() => navigate("/start-lecture")}>
              Start
            </button>
          </div>

          <div className="faculty-card">
            <h3>View Lectures</h3>
            <p>Manage scheduled lectures.</p>
            <button onClick={() => navigate("/view-lectures")}>
              View
            </button>
          </div>

          <div className="faculty-card">
            <h3>View Attendance</h3>
            <p>Check attendance records.</p>
            <button onClick={() => navigate("/attendance")}>
              View
            </button>
          </div>

        </div>

      </div>

      <footer className="footer">
        © 2026 PROXISCAN | All Rights Reserved
      </footer>
    </div>
  );
}

export default FacultyDashboard;