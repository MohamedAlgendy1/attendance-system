import React, { useState } from "react";
import { useParams } from "react-router-dom";

function StudentScan() {
  const { lectureId } = useParams();
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!studentName || !studentId) {
      setMessage("Please enter all fields");
      return;
    }

    // نجيب الحضور القديم
    const attendance =
      JSON.parse(localStorage.getItem("attendance")) || [];

    // نتأكد إن الطالب مسجلش قبل كده
    const alreadyMarked = attendance.find(
      (item) =>
        item.lectureId === lectureId && item.studentId === studentId
    );

    if (alreadyMarked) {
      setMessage("You already marked attendance!");
      return;
    }

    // نسجل حضور جديد
    const newRecord = {
      lectureId,
      studentName,
      studentId,
      time: new Date().toLocaleString(),
    };

    const updatedAttendance = [...attendance, newRecord];
    localStorage.setItem(
      "attendance",
      JSON.stringify(updatedAttendance)
    );

    setMessage("Attendance marked successfully ✅");
    setStudentName("");
    setStudentId("");
  };

  return (
    <div style={containerStyle}>
      <h2>Mark Attendance</h2>
      <p>Lecture ID: {lectureId}</p>

      <input
        type="text"
        placeholder="Enter Your Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Enter Your ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        style={inputStyle}
      />

      <button onClick={handleSubmit} style={buttonStyle}>
        Confirm
      </button>

      <p>{message}</p>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const inputStyle = {
  margin: "10px",
  padding: "10px",
  width: "250px",
};

const buttonStyle = {
  padding: "10px 20px",
  cursor: "pointer",
};

export default StudentScan;