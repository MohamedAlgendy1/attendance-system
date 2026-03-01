import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function ViewLectures() {
  // جلب المحاضرات من localStorage أو بيانات افتراضية
  const [lectures, setLectures] = useState(() => {
    const stored = localStorage.getItem("activeLectures");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            title: "React Basics",
            subject: "Web Development",
            room: "A101",
            doctor: "Dr. Ahmed",
            radius: 50,
          },
          {
            id: 2,
            title: "Data Structures",
            subject: "CS",
            room: "B201",
            doctor: "Dr. Sara",
            radius: 60,
          },
        ];
  });

  const [message, setMessage] = useState("");

  const handleDelete = (id) => {
    const updated = lectures.filter((lecture) => lecture.id !== id);
    setLectures(updated);
    localStorage.setItem("activeLectures", JSON.stringify(updated));

    setMessage("Lecture deleted successfully ✔");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="page">
      <Navbar />

      <div className="table-container">
        <h2 className="table-title">Lectures List</h2>

        {message && <div className="success-message">{message}</div>}

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
                  <button className="edit-btn">Edit</button>
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
      </div>

      <footer className="footer">
        © 2026 Attendify | All Rights Reserved
      </footer>
    </div>
  );
}

export default ViewLectures;