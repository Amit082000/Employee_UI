const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// @route  POST /api/departments

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const department = new Department({ name, description });
    await department.save();
    res.json(department);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


// @route  GET /api/departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
