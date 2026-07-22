const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Beginner', 'Refresher', 'VIP'],
      required: [true, 'Course type is required'],
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    lessonCount: {
      type: Number,
      required: [true, 'Lesson count is required'],
      min: [1, 'Must have at least 1 lesson'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);