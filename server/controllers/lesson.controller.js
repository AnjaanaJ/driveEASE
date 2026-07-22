const Lesson = require('../models/Lesson');
const createLesson = async (req, res) => {
  try {
    const { studentId, instructorId, vehicleId, date, startTime, endTime } = req.body;
    const lesson = await Lesson.create({
      studentId,
      instructorId,
      vehicleId,
      date,
      startTime,
      endTime,
    });
    res.status(201).json({ message: 'Lesson booked successfully', lesson });
  } catch (error) {
    res.status(400).json({ message: 'Failed to book lesson', error: error.message });
  }
};
const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lessons', error: error.message });
  }
};
module.exports = { createLesson,getLessons };