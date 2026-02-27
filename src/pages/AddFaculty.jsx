import { useState } from "react";
import Navbar from "../components/Navbar";

function AddFaculty() {
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);
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

            <button type="submit">Add</button>

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