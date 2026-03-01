import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";

function ViewStudents() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Sagar",
      email: "sagar@gmail.com",
      phone: "9897544989",
      roll: "101",
      department: "CSE",
      status: "Active",
    },
    {
      id: 2,
      name: "Ali",
      email: "ali@gmail.com",
      phone: "9876543210",
      roll: "102",
      department: "IT",
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const rowsPerPage = 5;

  // ===== SEARCH + SORT =====
  const filteredStudents = useMemo(() => {
    let filtered = students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortKey) {
      filtered.sort((a, b) =>
        a[sortKey].localeCompare(b[sortKey])
      );
    }

    return filtered;
  }, [students, search, sortKey]);

  // ===== PAGINATION =====
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  const handleDelete = () => {
    setStudents(students.filter((s) => s.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="page">
      <Navbar />

      <div className="table-container">
        <h2 className="table-title">Student List</h2>

        {/* ===== Search ===== */}
        <input
          className="search-input"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="student-table">
          <thead>
            <tr>
              <th onClick={() => setSortKey("name")}>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th onClick={() => setSortKey("roll")}>Roll</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentStudents.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <div className="empty-state">
                    <h3>No Students Found</h3>
                    <p>Try adjusting search or filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              currentStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.roll}</td>
                  <td>{student.department}</td>
                  <td>
                    <span
                      className={
                        student.status === "Active"
                          ? "badge active"
                          : "badge inactive"
                      }
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => setDeleteId(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* ===== Pagination ===== */}
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>{/* ===== Confirmation Modal ===== */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this student?</p>
            <div className="modal-actions">
              <button onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewStudents;