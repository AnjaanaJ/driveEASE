const express = require("express");
const router = express.Router();

const {
  createInstructor,
  getInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} = require("../controllers/instructor.controller");

router.post("/", createInstructor);
router.get("/", getInstructors);
router.get("/:id", getInstructorById);
router.put("/:id", updateInstructor);
router.delete("/:id", deleteInstructor);

module.exports = router;