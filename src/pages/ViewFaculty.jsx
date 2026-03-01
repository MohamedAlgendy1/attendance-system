import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import axios from "axios";

function ViewFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // ================= Fetch Faculty =================
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) throw new Error("Unauthorized");

        // 👇 API الحقيقي
        /*
        const response = await axios.get("/api/faculty", {
          headers: { Authorization: Bearer ${token} }
        });
        setFaculty(response.data);
        */

        // Simulation مؤقت
        await new Promise((resolve) => setTimeout(resolve, 800));

        setFaculty([
          {
            id: 1,
            name: "Ahmed Ali",
            email: "ahmed@uni.com",
            department: "Computer Science",
            phone: "01000000000"
          },
          {
            id: 2,
            name: "Sara Mohamed",
            email: "sara@uni.com",
            department: "Information Systems",
            phone: "01111111111"
          }
        ]);

      } catch {
        setErrorMessage("Failed to load faculty list");
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  // ================= Delete =================
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Unauthorized");

      // 👇 API الحقيقي
      /*
      await axios.delete(`/api/faculty/${id}`, {
        headers: { Authorization: Bearer ${token} }
      });
      */

      setFaculty((prev) => prev.filter((item) => item.id !== id));

      setMessage("Faculty deleted successfully ✔");

      setTimeout(() => setMessage(""), 2000);

    } catch {
      setErrorMessage("Failed to delete faculty");
    }
  };

  return (
    <div className="page">
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-box">

          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Faculty List
          </h2>

          {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

          {errorMessage && (
            <p style={{ color: "#ef4444", textAlign: "center" }}>
              {errorMessage}
            </p>
          )}

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {!loading && !errorMessage && (
            <table className="faculty-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {faculty.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.department}</td>
                    <td>{item.phone}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}

        </div>
      </div>

      <footer className="footer">
        © 2025 Attendify
      </footer>
    </div>
  );
}

export default ViewFaculty;