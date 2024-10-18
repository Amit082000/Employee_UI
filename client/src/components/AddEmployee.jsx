// src/components/AddEmployee.js
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';

const AddEmployee = ({ departments, addEmployee }) => {
  const [employee, setEmployee] = useState({
    name: '',
    department: '',
    address: ''
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEmployee(employee); // Send data to backend
    setEmployee({ name: '', department: '', address: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={employee.name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Department"
        name="department"
        value={employee.department}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      >
        {departments.map((dept) => (
          <MenuItem key={dept.id} value={dept.name}>
            {dept.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Address"
        name="address"
        value={employee.address}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        Add Employee
      </Button>
    </Box>
  );
};

export default AddEmployee;
