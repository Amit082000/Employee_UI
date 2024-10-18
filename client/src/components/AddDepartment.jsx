// src/components/AddDepartment.js
import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddDepartment = ({ addDepartment }) => {
  const [department, setDepartment] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    setDepartment({
      ...department,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDepartment(department); // Send data to backend
    setDepartment({ name: '', description: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={department.name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={department.description}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        Add Department
      </Button>
    </Box>
  );
};

export default AddDepartment;
