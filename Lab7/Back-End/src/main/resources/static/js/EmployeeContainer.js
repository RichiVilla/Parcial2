import React, { useState, useEffect } from 'react';
import EmployeeTable from './EmployeeTable';

const EmployeeContainer = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/employee/example/api/employee');
      const data = await response.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  return <EmployeeTable employees={employees} />;
};

export default EmployeeContainer;