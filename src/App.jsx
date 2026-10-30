
import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const ITEMS_PER_PAGE = 10;

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        alert("failed to fetch data");
      }
    };

    fetchEmployees();
  }, []);

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEmployees = employees.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrevious = () => {
    setCurrentPage((previousPage) =>
      Math.max(previousPage - 1, 1)
    );
  };

  const handleNext = () => {
    setCurrentPage((previousPage) =>
      Math.min(previousPage + 1, totalPages)
    );
  };

  return (
    <div className="container">
      <h1>Employee Data Table</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
