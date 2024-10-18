// src/components/EmployeeList.js
import { useState } from 'react';
import { TextField, MenuItem, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const EmployeeList = ({ employees, departments }) => {
  const [filter, setFilter] = useState({ name: '', department: '' });

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      (filter.department === '' || emp.department === filter.department)
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Filter by Name"
          name="name"
          value={filter.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          select
          label="Filter by Department"
          name="department"
          value={filter.department}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {departments.map((dept) => (
            <MenuItem key={dept.id} value={dept.name}>
              {dept.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.address}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No employees found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeList;
