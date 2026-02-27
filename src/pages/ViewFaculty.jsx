import { useState } from "react";
import Navbar from "../components/Navbar";

function ViewFaculty() {
  const [faculty, setFaculty] = useState([
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

  const [message, setMessage] = useState("");

  const handleDelete = (id) => {
    setFaculty(faculty.filter((item) => item.id !== id));

    setMessage("Faculty deleted successfully ✔");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const handleEdit =() => {
    setMessage("Faculty updated successfully ✔");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="page">
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-box">

          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Faculty List
          </h2>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

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
                        className="edit-btn"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>

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

        </div>
      </div>

      <footer className="footer">
        © 2025 Attendify
      </footer>
    </div>
  );
}

export default ViewFaculty;