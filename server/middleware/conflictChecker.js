const Lesson = require('../models/Lesson');

const conflictChecker = async (req, res, next) => {
  try {
    let {
      instructorId,
      vehicleId,
      studentId,
      date,
      startTime,
      endTime,
    } = req.body;

    // For updates, use the existing lesson values
    if (req.params.id) {
      const existingLesson = await Lesson.findById(req.params.id);

      if (!existingLesson) {
        return res.status(404).json({
          message: 'Lesson not found',
        });
      }

      instructorId = instructorId || existingLesson.instructorId;
      vehicleId = vehicleId || existingLesson.vehicleId;
      studentId = studentId || existingLesson.studentId;
      date = date || existingLesson.date;
      startTime = startTime || existingLesson.startTime;
      endTime = endTime || existingLesson.endTime;
    }

    const query = {
      date,
      status: { $ne: 'Cancelled' },
      $or: [
        { instructorId },
        { vehicleId },
        { studentId },
      ],
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    };

    // Don't compare the lesson against itself when updating
    if (req.params.id) {
      query._id = { $ne: req.params.id };
    }

    const conflictingLesson = await Lesson.findOne(query);

    if (conflictingLesson) {
      return res.status(409).json({
        message:
          'Booking conflict: student, instructor or vehicle is already booked for an overlapping time slot',
        conflictingLesson,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: 'Error checking for booking conflicts',
      error: error.message,
    });
  }
};

module.exports = conflictChecker;