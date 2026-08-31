const express = require('express');

// Import only Member 2's routes
const studentRoutes = require('../routes/student.routes');
const courseRoutes = require('../routes/course.routes');

const app = express();

app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);

module.exports = app;