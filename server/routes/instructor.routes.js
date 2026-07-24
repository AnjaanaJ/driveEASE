const express = require("express");
const router = express.Router();

const {
  createInstructor,
  getInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
  getInstructorAvailability,
  updateInstructorAvailability,
} = require("../controllers/instructor.controller");

router.post("/", createInstructor);
router.get("/", getInstructors);
router.get("/:id", getInstructorById);
router.put("/:id", updateInstructor);
router.delete("/:id", deleteInstructor);
router.get("/:id/availability", getInstructorAvailability);
router.put("/:id/availability", updateInstructorAvailability);

module.exports = router;