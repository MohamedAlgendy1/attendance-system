import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
// import { fetchAttendance } from "../services/api";

function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAttendance = async () => {
      const useMock = true; // غيرها لـ false لما تعمل Backend

      try {
        if (useMock) {
          // 🔹 بيانات تجريبية
          const fakeData = [
            {
              id: 1,
              studentName: "Ahmed Ali",
              lecture: "React Basics",
              time: "2026-03-01 10:00",
              status: "Present",
            },
            {
              id: 2,
              studentName: "Sara Mohamed",
              lecture: "Data Structures",
              time: "2026-03-01 11:00",
              status: "Absent",
            },
          ];

          // محاكاة تأخير السيرفر
          setTimeout(() => {
            setAttendanceList(fakeData);
            setLoading(false);
          }, 800);
        } else {
          // 🔹 لما تعمل Backend
          // const res = await fetchAttendance();
          // setAttendanceList(res.data);
          setLoading(false);
        }
      } catch {
        setError("Failed to load attendance ❌");
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  return (
    <div className="page">
      <Navbar />

      <div className="table-container">
        <h2 className="table-title">Attendance Records</h2>

        {loading && <p>Loading attendance...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && attendanceList.length === 0 && (
          <p>No attendance records found</p>
        )}

        {!loading && attendanceList.length > 0 && (
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
              {attendanceList.map((record) => (
                <tr key={record.id}>
                  <td>{record.studentName}</td>
                  <td>{record.lecture}</td>
                  <td>{record.time}</td>
                  <td
                    className={
                      record.status === "Present"
                        ? "status-present"
                        : "status-absent"
                    }
                  >
                    {record.status}
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

export default Attendance;