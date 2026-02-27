import { useState } from "react";
import Navbar from "../components/Navbar";

function AddStudent() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="page">
      <Navbar />

      <div className="form-container">
        <h2>Add New Student</h2>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Student Email" required />
          <input type="text" placeholder="Student Name" required />
          <input type="text" placeholder="Student Phone" required />
          <input type="password" placeholder="Password" required />
          <input type="text" placeholder="Student Roll No" required />

          <select required>
            <option value="">Select Department</option>
            <option>Computer Science</option>
            <option>IT</option>
            <option>AI</option>
          </select>

          <button type="submit">Add Student</button>
        </form>

        {/* Success Overlay */}
        {success && (
          <div className="success-overlay">
            <div className="success-icon">✔</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddStudent;