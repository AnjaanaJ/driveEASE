const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const verifyToken = require("../middleware/verifyToken");

const requireRole = require("../middleware/requireRole");

const {
  createInstructor,
  getInstructors,
  getInstructorById,
  getMyInstructorProfile,
  updateInstructor,
  deleteInstructor,
  getInstructorAvailability,
  updateInstructorAvailability,
  getInstructorStudents,
  getInstructorPerformance,
  uploadInstructorDocument,
} = require("../controllers/instructor.controller");

// Admin Instructor Management
router.post(
  "/",
  verifyToken,
  requireRole("admin"),
  createInstructor
);

router.get(
  "/",
  verifyToken,
  requireRole("admin", "instructor", "student"),
  getInstructors
);

// Logged-in Instructor's own profile
router.get(
  "/me",
  verifyToken,
  requireRole("instructor"),
  getMyInstructorProfile
);

// Admin Instructor Management
router.get(
  "/:id/performance",
  verifyToken,
  requireRole("admin"),
  getInstructorPerformance
);

router.get(
  "/:id",
  verifyToken,
  requireRole("admin"),
  getInstructorById
);

router.put(
  "/:id",
  verifyToken,
  requireRole("admin"),
  updateInstructor
);

router.delete(
  "/:id",
  verifyToken,
  requireRole("admin"),
  deleteInstructor
);

// Instructor Availability
router.get(
  "/:id/availability",
  verifyToken,
  requireRole("admin", "instructor"),
  getInstructorAvailability
);

router.put(
  "/:id/availability",
  verifyToken,
  requireRole("admin", "instructor"),
  updateInstructorAvailability
);

// Assigned Students
router.get(
  "/:id/students",
  verifyToken,
  requireRole("admin", "instructor"),
  getInstructorStudents
);

// Instructor Documents
router.post(
  "/:id/documents",
  verifyToken,
  requireRole("admin", "instructor"),
  upload.single("document"),
  uploadInstructorDocument
);

module.exports = router;