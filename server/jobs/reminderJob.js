const cron = require('node-cron');
const Lesson = require('../models/Lesson');
const Notification = require('../models/Notification');

const sendLessonReminders = async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateString = tomorrow.toISOString().split('T')[0];

    const upcomingLessons = await Lesson.find({
      date: tomorrowDateString,
      status: 'Scheduled',
    });

    for (const lesson of upcomingLessons) {
      const alreadyReminded = await Notification.findOne({
        userId: lesson.studentId,
        type: 'Reminder',
        message: { $regex: lesson._id.toString() },
      });

      if (!alreadyReminded) {
        await Notification.create({
          userId: lesson.studentId,
          message: `Reminder: your lesson tomorrow at ${lesson.startTime} is coming up. (ref:${lesson._id})`,
          type: 'Reminder',
        });
      }
    }

    console.log(`[Reminder Job] Checked ${upcomingLessons.length} lesson(s) for tomorrow, ${new Date().toISOString()}`);
  } catch (error) {
    console.error('[Reminder Job] Failed:', error.message);
  }
};

const startReminderJob = () => {
  cron.schedule('0 8 * * *', sendLessonReminders);
  console.log('[Reminder Job] Scheduled to run daily at 8:00 AM');
};

module.exports = { startReminderJob, sendLessonReminders };