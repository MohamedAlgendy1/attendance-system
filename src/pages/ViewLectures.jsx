import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function ViewLectures() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================= Fetch Lectures =================
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await API.get("/lectures");
        setLectures(res.data);
      } catch {
        setError("Failed to load lectures ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  // ================= Delete Lecture =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lecture?"))
      return;

    try {
      await API.delete(`/lectures/${id}`);

      setLectures((prev) => prev.filter((lecture) => lecture.id !== id));
      setMessage("Lecture deleted successfully ✔");

      setTimeout(() => setMessage(""), 2000);
    } catch {
      setError("Delete failed ❌");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="page">
      <Navbar />

      <div className="table-container">
        <h2 className="table-title">Lectures List</h2>

        {loading && <p>Loading lectures...</p>}
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        {!loading && lectures.length === 0 && (
          <p>No lectures available.</p>
        )}

        {!loading && lectures.length > 0 && (
          <table className="student-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Room</th>
                <th>Doctor</th>
                <th>Radius (m)</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {lectures.map((lecture) => (
                <tr key={lecture.id}>
                  <td>{lecture.title}</td>
                  <td>{lecture.subject}</td>
                  <td>{lecture.room}</td>
                  <td>{lecture.doctor}</td>
                  <td>{lecture.radius}</td>
                  <td>
                    <button className="edit-btn">
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(lecture.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <footer className="footer">
        © 2026 Attendify | All Rights Reserved
      </footer>
    </div>
  );
}

export default ViewLectures;