const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");


const {
  createInstructor,
  getInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
  getInstructorAvailability,
  updateInstructorAvailability,
  getInstructorStudents,
  getInstructorPerformance,
  uploadInstructorDocument,
} = require("../controllers/instructor.controller");

router.post("/", createInstructor);
router.get("/", getInstructors);
router.get("/:id/performance", getInstructorPerformance);
router.get("/:id", getInstructorById);
router.put("/:id", updateInstructor);
router.delete("/:id", deleteInstructor);
router.get("/:id/availability", getInstructorAvailability);
router.put("/:id/availability", updateInstructorAvailability);
router.get("/:id/students", getInstructorStudents);
router.post("/:id/documents", upload.single("document"), uploadInstructorDocument);


module.exports = router;