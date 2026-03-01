import React, { useState, useRef, useEffect } from "react";
import QRCode from "react-qr-code";

function StartLecture() {
  const [lectureData, setLectureData] = useState(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");
  const [doctor, setDoctor] = useState("");
  const [radius, setRadius] = useState(50);
  const [timeLeft, setTimeLeft] = useState(120);

  const timerRef = useRef(null);

  const stopLecture = () => {
    localStorage.removeItem("activeLecture");
    setLectureData(null);
    setTimeLeft(120);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleStart = () => {
    if (!title || !subject||  !room || !doctor) {
      alert("Please fill all fields");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLecture = {
          id: Date.now(),
          title,
          subject,
          room,
          doctor,
          radius: Number(radius),
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        localStorage.setItem("activeLecture", JSON.stringify(newLecture));
        setLectureData(newLecture);
        setTimeLeft(120);

        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              stopLecture();
              return 120;
            }
            return prev - 1;
          });
        }, 1000);
      },
      () => {
        alert("Location access required");
      }
    );
  };

  // ✅ مهم جدًا تنظيف التايمر لو خرج من الصفحة
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const qrLink = lectureData
    ? `https://attendance-system-nine-wheat.vercel.app/scan/${lectureData.id}`
    : "";

  return (
    <div className="lecture-page">
      <div className="lecture-card">
        {!lectureData ? (
          <>
            <h2>Start New Lecture</h2>

            <input
              type="text"
              placeholder="Lecture Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <input
              type="text"
              placeholder="Room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />

            <input
              type="text"
              placeholder="Doctor Name"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            />

            <input
              type="number"
              placeholder="Allowed Distance (meters)"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            />

            <button onClick={handleStart}>Generate QR</button>
          </>
        ) : (
          <>
            <h3>{lectureData.title}</h3>

            <QRCode value={qrLink} size={220} />

            <p>Allowed Distance: {lectureData.radius} meters</p>

            <p style={{ color: "red", fontWeight: "bold" }}>
              QR expires in: {timeLeft}s
            </p>

            <button onClick={stopLecture}>
              Stop Lecture
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default StartLecture;