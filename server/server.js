const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://amit0811:RAwznUPn8BoO7wg1@cluster0.5iibb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employee');

// Use Routes
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
