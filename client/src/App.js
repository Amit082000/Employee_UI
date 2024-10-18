// src/App.js
import  { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import AddEmployee from './components/AddEmployee';
import AddDepartment from './components/AddDepartment';
import EmployeeList from './components/EmployeeList';

function App() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Fetch departments and employees on component mount
  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const addDepartment = async (department) => {
    try {
      const response = await fetch('http://localhost:5000/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(department)
      });
      const newDepartment = await response.json();
      setDepartments([...departments, newDepartment]);
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const addEmployee = async (employee) => {
    try {
      const response = await fetch('http://localhost:5000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      });
      const newEmployee = await response.json();
      setEmployees([...employees, newEmployee]);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Employee Management System
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Add Department</Typography>
        <AddDepartment addDepartment={addDepartment} />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Add Employee</Typography>
        <AddEmployee departments={departments} addEmployee={addEmployee} />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Employee List</Typography>
        <EmployeeList employees={employees} departments={departments} />
      </Box>
    </Container>
  );
}

export default App;
