const express = require("express");
const router = express.Router();

const { createInstructor } = require("../controllers/instructor.controller");
router.post("/", createInstructor);

module.exports = router;