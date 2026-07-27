const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const instructorRoutes = require("./routes/instructor.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const lessonRoutes = require("./routes/lesson.routes");
const paymentRoutes = require("./routes/payment.routes");
const notificationRoutes = require("./routes/notification.routes");
const studentRoutes = require("./routes/student.routes");
const courseRoutes = require("./routes/course.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("driveEASE API is running...");
});


module.exports = app;