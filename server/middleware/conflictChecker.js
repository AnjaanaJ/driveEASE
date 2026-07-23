const Lesson = require('../models/Lesson');
const conflictChecker = async (req, res, next) => {
  try {
    const { instructorId, vehicleId, date, startTime, endTime } = req.body;
    const conflictingLesson = await Lesson.findOne({
      date: date,
      status: { $ne: 'Cancelled' },
      $or: [{ instructorId: instructorId }, { vehicleId: vehicleId }],
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });
    if (conflictingLesson) {
      return res.status(409).json({
        message: 'Booking conflict: instructor or vehicle is already booked for an overlapping time slot',
        conflictingLesson,
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking for booking conflicts', error: error.message });
  }
};

module.exports = conflictChecker;