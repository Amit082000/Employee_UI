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
      const response = await fetch('http://localhost:5000/api/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const addDepartment = async (department) => {
    try {
      const response = await fetch('http://localhost:5000/api/departments', {
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
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      });
      const newEmployee = await response.json();
      setEmployees([...employees, newEmployee]);
      window.location.reload();

    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };



  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Employee Management System
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
             <Box sx={{ flex: 1, mr: 2 }}> 
                <Typography variant="h6"  align='center'>Add Department</Typography>
                 <AddDepartment addDepartment={addDepartment} />
            </Box>

           <Box sx={{ flex: 1, ml: 2 }}>
              <Typography variant="h6"  align='center' >Add Employee</Typography>
              <AddEmployee departments={departments} addEmployee={addEmployee} />
             </Box>
      </Box>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h6" align='center' >Employee List</Typography>
        <EmployeeList employees={employees} departments={departments} />
      </Box>
    </Container>
  );
}

export default App;
