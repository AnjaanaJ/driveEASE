const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Linked user account is required"],
    },
    nic: {
      type: String,
      required: [true, "NIC is required"],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    coursePackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    preferredVehicleType: {
      type: String,
      enum: ["Car", "Bike"],
    },
    preferredTransmission: {
      type: String,
      enum: ["Manual", "Automatic"],
    },
    assignedInstructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
    attendance: [
      {
        date: { type: Date, default: Date.now },
        present: { type: Boolean, default: true },
      },
    ],
    documents: [
      {
        fileName: String,
        fileUrl: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    studentId: {
      type: String,
      unique: true,
      sparse: true, // allows many students to have "no studentId yet" without breaking uniqueness
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", studentSchema);
