import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRDisplay from "./pages/QRDisplay";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentScan from "./pages/StudentScan";
import AddFaculty from "./pages/AddFaculty";
import ViewFaculty from "./pages/ViewFaculty";

import AddStudent from "./pages/AddStudent";
import ViewStudents from "./pages/ViewStudents";
import StartLecture from "./pages/StartLecture";
import ViewLectures from "./pages/ViewLectures";
import Attendance from "./pages/Attendance";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LOGIN ================= */}
        <Route path="/" element={<Login />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addfaculty"
          element={
            <ProtectedRoute allowedRole="admin">
              <AddFaculty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewfaculty"
          element={
            <ProtectedRoute allowedRole="admin">
              <ViewFaculty />
            </ProtectedRoute>
          }
        />

        {/* ================= FACULTY ROUTES ================= */}
        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute allowedRole="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-student"
          element={
            <ProtectedRoute allowedRole="faculty">
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-students"
          element={
            <ProtectedRoute allowedRole="faculty">
              <ViewStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/start-lecture"
          element={
            <ProtectedRoute allowedRole="faculty">
              <StartLecture />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-lectures"
          element={
            <ProtectedRoute allowedRole="faculty">
              <ViewLectures />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRole="faculty">
              <Attendance />
            </ProtectedRoute>
          }
        />

        {/* ================= QR PAGE ================= */}
        <Route path="/qr-display" element={<QRDisplay />} />
        <Route path="/scan/:lectureId" element={<StudentScan />} />


      </Routes>


    </BrowserRouter>
  );
}

export default App;