import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 1️⃣ مفيش توكن → رجعه لصفحة الدخول
  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 2️⃣ فيه Role مطلوب ومش مطابق
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;