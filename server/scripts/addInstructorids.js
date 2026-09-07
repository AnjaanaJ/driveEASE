const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Instructor = require("../models/Instructor");

dotenv.config();

const addInstructorIds = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const instructors = await Instructor.find().sort({ createdAt: 1 });

    console.log(`Found ${instructors.length} instructors`);

    for (let i = 0; i < instructors.length; i++) {
      const instructorId = `INS-${String(i + 1).padStart(4, "0")}`;

      instructors[i].instructorId = instructorId;

      await instructors[i].save();

      console.log(`${instructors[i]._id} -> ${instructorId}`);
    }

    console.log("Instructor IDs added successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

addInstructorIds();