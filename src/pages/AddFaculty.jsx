import { useState } from "react";
import Navbar from "../components/Navbar";
// لاحقًا هنستخدم axios
// import axios from "axios";

function AddFaculty() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    code: "",
    department: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Unauthorized");
      }

      // 👇 ده مكان API الحقيقي
      /*
      await axios.post("/api/faculty", formData, {
        headers: {
          Authorization: Bearer ${token}
        }
      });
      */

      // Simulation مؤقت
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);

      // مسح الفورم بعد النجاح
      setFormData({
        email: "",
        name: "",
        password: "",
        phone: "",
        code: "",
        department: ""
      });

    } catch {
      setErrorMessage("Failed to add faculty");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-box">

          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Add New Faculty Member
          </h2>

          {success && (
            <p style={{ color: "#22c55e", textAlign: "center", marginBottom: "10px" }}>
              Faculty Added Successfully ✅
            </p>
          )}

          {errorMessage && (
            <p style={{ color: "#ef4444", textAlign: "center", marginBottom: "10px" }}>
              {errorMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="add-form">

            <input
              type="email"
              name="email"
              placeholder="Faculty Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="name"
              placeholder="Faculty Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <div className="row">
              <input
                type="password"
                name="password"
                placeholder="Faculty Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Faculty Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <input
                type="text"
                name="code"
                placeholder="Faculty Code"
                value={formData.code}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>

          </form>

        </div>
      </div>

      <footer className="footer">
        © 2025 Attendify
      </footer>
    </div>
  );
}

export default AddFaculty;