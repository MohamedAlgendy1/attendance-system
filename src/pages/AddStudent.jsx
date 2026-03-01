import { useState } from "react";
import Navbar from "../components/Navbar";

function AddStudent() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    roll: "",
    department: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Student Data:", formData); // جاهز تبعته للـ API

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);

    // Reset form
    setFormData({
      email: "",
      name: "",
      phone: "",
      password: "",
      roll: "",
      department: "",
    });
  };

  return (
    <div className="page">
      <Navbar />

      <div className="form-container">
        <h2>Add New Student</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Student Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Student Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="roll"
            placeholder="Student Roll No"
            value={formData.roll}
            onChange={handleChange}
            required
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="IT">IT</option>
            <option value="AI">AI</option>
          </select>

          <button type="submit">Add Student</button>
        </form>

        {success && (
          <div className="success-overlay">
            <div className="success-icon">✔</div>
            <p>Student Added Successfully</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddStudent;