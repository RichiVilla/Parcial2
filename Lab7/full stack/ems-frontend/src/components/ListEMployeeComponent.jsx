import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeServices';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const ListEMployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ id: '', firstName: '', lastName: '' });
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees(){
    listEmployees()
    .then((response) => {
      setEmployees(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function addNewEmployee(){
    navigator('/add-employee')
  }

  function handleUpdateEmployee(id) {
    navigator(`/update-employee/${id}`)
};

function handleDeleteEmployee(employee) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `ARE YOU SURE YOU WANT TO DELETE ${employee.firstname} ${employee.lastname} EMPLOYEE?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(employee.employeeId)
          .then((response) => {
            getAllEmployees();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="container">
      <h2 className="text-center">
        <FaUserCircle style={{ marginRight: '10px' }} /> EMPLOYEES LIST
      </h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>
                <FaUserCircle color={getRandomColor()} />
              </td>
              <td>{employee.employeeId}</td>
              <td>{employee.firstname}</td>
              <td>{employee.lastname}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => handleUpdateEmployee(employee.employeeId)}
                >
                  UPDATE
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteEmployee(employee)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={addNewEmployee}>
        NEW
      </button>
    </div>
  );
};

export default ListEMployeeComponent;