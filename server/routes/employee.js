const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Department = require('../models/Department');

// @route  POST /api/employees
router.post('/', async (req, res) => {
  try {
    const { name, department, address } = req.body;

    // Check if the department exists
    const foundDepartment = await Department.findById(department);
    if (!foundDepartment) {
      return res.status(404).json({ msg: 'Department not found' });
    }

    const employeeCode = `EMP-${Date.now()}`;

    const newEmployee = new Employee({
      name,
      department,
      address,
      employeeCode
    });

    await newEmployee.save();
    res.json(newEmployee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  GET /api/employees
router.get('/', async (req, res) => {
  try {
    const { name, department } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (department) {
      query.department = department;
    }

    const employees = await Employee.find(query).populate('department', 'name');

    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
