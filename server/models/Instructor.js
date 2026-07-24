const mongoose = require("mongoose");
const instructorSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
    phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
},
    nic: {
    type: String,
    required: [true, "NIC is required"],
    unique: true,
    trim: true,
},
    licenseNumber: {
    type: String,
    required: [true, "License number is required"],
    unique: true,
    trim: true,
},
    experience: {
    type: Number,
    required: [true, "Experience is required"],
    min: [0, "Experience cannot be negative"],
},
    qualification: {
    type: String,
    required: [true, "Qualification is required"],
    trim: true,
},

    availability: [
  {
    day: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
  },
],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
},
{
    timestamps: true,
  }
);
module.exports = mongoose.model("Instructor", instructorSchema);