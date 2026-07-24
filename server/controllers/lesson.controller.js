const Lesson = require('../models/Lesson');
const Notification = require('../models/Notification');

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
    await Notification.create({
      userId: studentId,
      message: `Your lesson on ${date} at ${startTime} has been booked and confirmed.`,
      type: 'Booking',
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
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lesson', error: error.message });
  }
};
const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    const { date, startTime, endTime, status } = req.body;
    if (date) lesson.date = date;
    if (startTime) lesson.startTime = startTime;
    if (endTime) lesson.endTime = endTime;
    if (status) lesson.status = status;

    await lesson.save();

    res.status(200).json({ message: 'Lesson updated successfully', lesson });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update lesson', error: error.message });
  }
};
const cancelLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    lesson.status = 'Cancelled';
    await lesson.save();

    res.status(200).json({ message: 'Lesson cancelled successfully', lesson });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel lesson', error: error.message });
  }
};
const getAvailableSlots = async (req, res) => {
  try {
    const { date, instructorId, vehicleId } = req.query;

    if (!date || !instructorId || !vehicleId) {
      return res.status(400).json({ message: 'date, instructorId, and vehicleId are all required' });
    }

    const bookedLessons = await Lesson.find({
      date: date,
      status: { $ne: 'Cancelled' },
      $or: [{ instructorId: instructorId }, { vehicleId: vehicleId }],
    }).select('startTime endTime -_id');

    res.status(200).json({ date, bookedSlots: bookedLessons });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch available slots', error: error.message });
  }
};
const getLessonsByStudent = async (req, res) => {
  try {
    if (req.user.id !== req.params.studentId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const lessons = await Lesson.find({ studentId: req.params.studentId }).sort({ date: -1 });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lessons', error: error.message });
  }
};

const getLessonsByInstructor = async (req, res) => {
  try {
    if (req.user.id !== req.params.instructorId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const lessons = await Lesson.find({ instructorId: req.params.instructorId }).sort({ date: -1 });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lessons', error: error.message });
  }
};

module.exports = { createLesson,getLessons,getLessonById,updateLesson,cancelLesson,getAvailableSlots,getLessonsByStudent, getLessonsByInstructor };