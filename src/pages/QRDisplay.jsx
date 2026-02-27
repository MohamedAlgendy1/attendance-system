import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

function QRDisplay() {
  const navigate = useNavigate();

  // تحميل بيانات المحاضرة من localStorage
  const [lectureData] = useState(() => {
    const stored = localStorage.getItem("activeLecture");
    return stored ? JSON.parse(stored) : null;
  });

  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!lectureData) {
      navigate("/start-lecture");
      return;
    }

    const interval = setInterval(() => {
      if (Date.now() > lectureData.expiresAt) {
        setExpired(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lectureData, navigate]);

  if (!lectureData) return null;

  // 🔥 لينك ngrok بتاعك
  const qrLink = `https://columellate-folksily-rod.ngrok-free.dev/scan/${lectureData.id}`;

  return (
    <div className="qr-page">
      <div className="qr-container">
        <div className="qr-card">
          <h2>Scan this QR Code</h2>

          {!expired ? (
            <div className="qr-box">
              <QRCode value={qrLink} size={280} />
            </div>
          ) : (
            <div className="expired-box">
              QR Code Expired
            </div>
          )}

          <p className="qr-info">
            <strong>Lecture:</strong> {lectureData.title} <br />
            <strong>Room:</strong> {lectureData.room}
          </p>
        </div>
      </div>

      <footer className="footer">
        © 2026 PROXISCAN | All Rights Reserved
      </footer>
    </div>
  );
}

export default QRDisplay;