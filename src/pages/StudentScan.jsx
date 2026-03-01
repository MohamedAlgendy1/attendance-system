import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function StudentScan() {
  const { lectureId } = useParams();
  const [status, setStatus] = useState("Checking location...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAttendance = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await axios.post(
              "http://localhost:5000/api/attendance/scan",
              {
                lectureId,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }
            );

            if (response.data.success) {
              setStatus("✅ Attendance ثبت بنجاح");
            } else {
              setStatus(`❌ ${response.data.message}`);
            }
          } catch {
            setStatus("Server error ❌");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setStatus("Location permission denied ❌");
          setLoading(false);
        }
      );
    };

    checkAttendance();
  }, [lectureId]);

  return (
    <div className="scan-page">
      <div className="scan-card">
        <h2>Student Attendance</h2>

        <div
          className={`status-box ${
            loading
              ? "loading"
              : status.includes("✅")
              ? "success"
              : "error"
          }`}
        >
          {status}
        </div>
      </div>
    </div>
  );
}

export default StudentScan;