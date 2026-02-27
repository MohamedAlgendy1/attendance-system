import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


function StartLecture() {
  const navigate = useNavigate();

  const [lecture, setLecture] = useState({
    id: "",
    title: "",
    startTime: "",
    endTime: "",
    room: "",
  });

  const handleChange = (e) => {
    setLecture({
      ...lecture,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const lectureSession = {
    ...lecture,
    sessionId: Date.now(),
    createdAt: Date.now(),
    expiresAt: Date.now() + 2 * 60 * 1000,
  };

  // احفظ في localStorage
  localStorage.setItem("activeLecture", JSON.stringify(lectureSession));

  navigate("/qr-display");
};

  return (
    <div className="lecture-page">
      <Navbar />

      <div className="lecture-container">
        <div className="lecture-card">
          <h2>Start New Lecture</h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-group">
                <label>Lecture ID</label>
                <input
                  type="text"
                  name="id"
                  value={lecture.id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Lecture Title</label>
                <input
                  type="text"
                  name="title"
                  value={lecture.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="input-group">
                <label>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={lecture.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={lecture.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group full">
              <label>Lecture Room</label>
              <input
                type="text"
                name="room"
                value={lecture.room}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="start-btn">
              Start Lecture
            </button>
          </form>
        </div>
      </div>

      <footer className="footer">
        © 2026 PROXISCAN | All Rights Reserved
      </footer>
    </div>
  );
}

export default StartLecture;