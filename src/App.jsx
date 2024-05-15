import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [paginationNum, setPaginationNum] = useState(0);
  const [employees, setEmployees] = useState([]);
  const URL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => alert("failed to fetch data"));
  }, []);

  const slicedData = (num, end) => {
    return employees.slice(num, end).map((employee) => {
      return (
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>{employee.role}</td>
        </tr>
      );
    });
  };
  console.log(paginationNum, Math.ceil(employees.length / 10));
  return (
    <>
      <h1>Employee Data Table</h1>
      <table className="customTable">
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </thead>
        <tbody>{slicedData(paginationNum * 10, paginationNum * 10 + 10)}</tbody>
      </table>

      <div className="pagination">
        
          <button  onClick={() => {
            if(paginationNum > 0)
            setPaginationNum((prev) => prev - 1)
          }}>
            Previous
          </button>
        
        <button>{paginationNum + 1}</button>
        {paginationNum + 1 <= Math.ceil(employees.length / 10) - 1 && (
          <button onClick={() => setPaginationNum((prev) => prev + 1)}>
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default App;
