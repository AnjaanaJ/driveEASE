const Lesson = require('../models/Lesson');
const Notification = require('../models/Notification');
const User = require('../models/User');
const Student = require('../models/Student');
const Vehicle = require('../models/Vehicle');

const MAX_DURATION_MINUTES = 60;

const getDurationMinutes = (startTime, endTime) => {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  return (endH * 60 + endM) - (startH * 60 + startM);
};

const createLesson = async (req, res) => {
  try {
    const {instructorId, vehicleId, date, startTime, endTime } = req.body;

    if ( !instructorId || !vehicleId || !date || !startTime || !endTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const student = await Student.findOne({ userId: req.user.id });
    if (!student) {
      return res.status(400).json({ message: 'No student profile found for this account. Please complete your student registration first.' });
    }
    const studentId = student._id;
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
       message: 'Vehicle not found'
      });
    }

    if (vehicle.status === 'Maintenance') {
      return res.status(400).json({
        message: 'Vehicle is currently under maintenance and cannot be assigned to a lesson'
      });
    }     

    const chosenDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosenDate < today) {
      return res.status(400).json({ message: 'Booking date cannot be in the past' });
    }

    if (endTime <= startTime) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    const durationMinutes = getDurationMinutes(startTime, endTime);
    if (durationMinutes > MAX_DURATION_MINUTES) {
      return res.status(400).json({ message: `Lesson duration cannot exceed ${MAX_DURATION_MINUTES} minutes` });
    }
    const lesson = await Lesson.create({
      studentId,
      instructorId,
      vehicleId,
      date,
      startTime,
      endTime,
    });
    await Notification.create({
      userId: req.user.id,
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
    const lessons = await Lesson.find()
      .populate({
        path: 'studentId',
        select: 'nic phone userId',
        populate: { path: 'userId', select: 'name email' },
      })
      .populate({
        path: 'instructorId',
        select: 'licenseNumber phone user',
        populate: { path: 'user', select: 'name email' },
      })
      .populate('vehicleId', 'registrationNumber brand model');
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lessons', error: error.message });
  }
};
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate({
        path: 'studentId',
        select: 'nic phone userId',
        populate: { path: 'userId', select: 'name email' },
      })
      .populate({
        path: 'instructorId',
        select: 'licenseNumber phone user',
        populate: { path: 'user', select: 'name email' },
      })
      .populate('vehicleId', 'registrationNumber brand model');

    if (!lesson) {
      return res.status(404).json({
        message: 'Lesson not found',
      });
    }

    let isOwner = false;

    // Admin can access any lesson
    if (req.user.role === 'admin') {
      isOwner = true;
    }

    // Check instructor ownership
    if (
      req.user.role === 'instructor' &&
      lesson.instructorId &&
      lesson.instructorId.user &&
      lesson.instructorId.user._id.toString() === req.user.id
    ) {
      isOwner = true;
    }

    // Check student ownership
    if (
      req.user.role === 'student' &&
      lesson.studentId &&
      lesson.studentId.userId &&
      lesson.studentId.userId._id.toString() === req.user.id
    ) {
      isOwner = true;
    }

    if (!isOwner) {
      return res.status(403).json({
        message: 'Access denied',
      });
    }

    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch lesson',
      error: error.message,
    });
  }
};
const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    if (req.user.role === "instructor") {
    const instructor = await require("../models/Instructor").findOne({
      user: req.user.id,
    });

    if (!instructor || instructor._id.toString() !== lesson.instructorId.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
}
    const { date, startTime, endTime, status, progress, remarks } = req.body;

    if (status && req.user.role === 'student') {
      return res.status(403).json({ message: 'Students cannot change lesson status' });
    }
    const isReschedule = date || startTime || endTime;

    if (date) lesson.date = date;
    if (startTime) lesson.startTime = startTime;
    if (endTime) lesson.endTime = endTime;
    if (status) lesson.status = status;
    if (progress !== undefined) lesson.progress = progress;
    if (remarks !== undefined) lesson.remarks = remarks;

    await lesson.save();

    const message = isReschedule
      ? `Your lesson has been rescheduled to ${lesson.date.toISOString().split('T')[0]} at ${lesson.startTime}.`
      : `Your lesson status has been updated to "${lesson.status}".`;

    await Notification.create({
      userId: lesson.studentId,
      message: message,
      type: isReschedule ? 'Reminder' : 'StatusUpdate',
    });

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
    if (lesson.status !== 'Scheduled') {
      return res.status(400).json({ message: `Cannot cancel a lesson that is already ${lesson.status}` });
    }
    if (new Date(lesson.date) < new Date()) {
      return res.status(400).json({ message: 'Cannot cancel a lesson that has already occurred' });
    }
    lesson.status = 'Cancelled';
    await lesson.save();
    const dateStr = lesson.date.toISOString().split('T')[0];

    await Notification.create({
      userId: lesson.studentId,
      message: `Your lesson on ${dateStr} at ${lesson.startTime} has been cancelled.`,
      type: 'Cancellation',
    });

    await Notification.create({
      userId: lesson.instructorId,
      message: `The lesson on ${dateStr} at ${lesson.startTime} has been cancelled by the student.`,
      type: 'Cancellation',
    });

    const admin = await User.findOne({ role: 'admin' });
    if (admin) {
      await Notification.create({
        userId: admin._id,
        message: `A lesson on ${dateStr} at ${lesson.startTime} has been cancelled.`,
        type: 'Cancellation',
      });
    }
    
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
    const student = await Student.findOne({ userId: req.params.studentId });
    if (req.user.id !== req.params.studentId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    if (!student) {
      return res.status(200).json([]);
    }
    const lessons = await Lesson.find({ studentId: student._id })
    .populate({
        path: 'studentId',
        select: 'nic phone userId',
        populate: { path: 'userId', select: 'name email' },
      })
      .populate({
        path: 'instructorId',
        select: 'licenseNumber phone user',
        populate: { path: 'user', select: 'name email' },
      })
      .populate('vehicleId', 'registrationNumber brand model')
      .sort({ date: -1 });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lessons', error: error.message });
  }
};

const getLessonsByInstructor = async (req, res) => {
  try {
    const Instructor = require("../models/Instructor");

    let isOwner = false;
    let targetInstructorId = req.params.instructorId;

    // Admin can view any instructor's lessons
    if (req.user.role === "admin") {
      isOwner = true;
    }

    // Instructor can only view their own lessons
    if (req.user.role === "instructor") {
      const instructor = await Instructor.findOne({
        user: req.user.id,
      });
      if (!instructor) {
        return res.status(404).json({
          message: "No instructor profile found for this account.",
        });
      }
      if (req.params.instructorId === "me") {
        targetInstructorId = instructor._id.toString();
        isOwner = true;
      } else if (instructor._id.toString() === req.params.instructorId) {
        isOwner = true;
      }
    }

    if (!isOwner) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const lessons = await Lesson.find({
      instructorId: targetInstructorId,
    })
      .populate({
        path: "studentId",
        select: "nic phone userId",
        populate: {
          path: "userId",
          select: "name email",
        },
      })
      .populate({
        path: "instructorId",
        select: "licenseNumber phone user",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate(
        "vehicleId",
        "registrationNumber brand model"
      )
      .sort({ date: -1 });

    res.status(200).json(lessons);
  } catch (error) {
    console.error("Error fetching instructor lessons:", error);

    res.status(500).json({
      message: "Failed to fetch lessons",
      error: error.message,
    });
  }
};

module.exports = { createLesson,getLessons,getLessonById,updateLesson,cancelLesson,getAvailableSlots,getLessonsByStudent, getLessonsByInstructor };