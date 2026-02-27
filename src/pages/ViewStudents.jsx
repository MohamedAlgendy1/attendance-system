import Navbar from "../components/Navbar";

function ViewStudents() {
  const students = [
    {
      name: "sagar",
      email: "sagar@gmail.com",
      phone: "9897544989",
      password: "sagar",
      roll: "sagar",
      department: "CSE",
    },
  ];

  return (
    <div className="page">
      <Navbar />

      <div className="table-container">
        <h2 className="table-title">Student List</h2>

        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Password</th>
              <th>Roll No</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.password}</td>
                <td>{student.roll}</td>
                <td>{student.department}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="footer">
        © 2026 PROXISCAN | All Rights Reserved
      </footer>
    </div>
  );
}

export default ViewStudents;