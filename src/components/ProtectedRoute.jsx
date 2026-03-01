import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // لو مفيش توكن → يرجع Login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // لو فيه Role محدد ومش مطابق
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;