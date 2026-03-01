import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Attendance() {
  // بيانات حضور الطلاب، ممكن تستبدلها ببيانات حقيقية من DB
  const [attendanceList, setAttendanceList] = useState([
    {
      studentName: "Ahmed Ali",
      lecture: "React Basics",
      time: "2026-03-01 10:00",
      status: "Present",
    },
    {
      studentName: "Sara Mohamed",
      lecture: "Data Structures",
      time: "2026-03-01 11:00",
      status: "Absent",
    },
  ]);

  return (
    <div className="page">
      <Navbar />

      <div className="table-container">
        <h2 className="table-title">Attendance Records</h2>

        <table className="student-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Lecture</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {attendanceList.map((record, index) => (
              <tr key={index}>
                <td>{record.studentName}</td>
                <td>{record.lecture}</td>
                <td>{record.time}</td>
                <td
                  style={{
                    color:
                      record.status === "Present" ? "#22c55e" : "#ef4444",
                    fontWeight: "bold",
                  }}
                >
                  {record.status}
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

export default Attendance;