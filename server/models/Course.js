const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["Beginner", "Refresher", "VIP"],
      required: [true, "Course type is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Price must be greater than 0",
      },
    },
    lessonCount: {
      type: Number,
      required: [true, "Lesson count is required"],
      validate: {
        validator: function (value) {
          return Number.isInteger(value) && value > 0;
        },
        message: "Lesson count must be a positive whole number",
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
