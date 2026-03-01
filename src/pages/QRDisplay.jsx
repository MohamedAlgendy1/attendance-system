import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

function QRDisplay() {
  const navigate = useNavigate();

  // جلب بيانات المحاضرة من localStorage
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

    // هنا ما فيش timer، فقط علامة expired جاهزة للاستخدام لو أحببت
    const interval = setInterval(() => {
      // مثال: لو استخدمت expiresAt مستقبليًا
      if (lectureData.expiresAt && Date.now() > lectureData.expiresAt) {
        setExpired(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lectureData, navigate]);

  if (!lectureData) return null;

  const qrLink = `https://attendance-system-nine-wheat.vercel.app/scan/${lectureData.id}`;

  return (
    <div className="qr-page">
      <div className="qr-container">
        <div className="qr-card">
          <h2>Scan this QR Code</h2>

          {!expired ? (
            <div className="qr-box">
              <QRCode value={qrLink} size={300} />
            </div>
          ) : (
            <div className="expired-box">QR Code Expired</div>
          )}

          <p className="qr-info">
            <strong>Lecture:</strong> {lectureData.title} <br />
            <strong>Room:</strong> {lectureData.room}
          </p>
        </div>
      </div>

      <footer className="footer">
        © 2026 Attendify | All Rights Reserved
      </footer>
    </div>
  );
}

export default QRDisplay;