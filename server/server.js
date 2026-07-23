const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const adminRoutes=require('./routes/admin.routes');
const instructorRoutes = require("./routes/instructor.routes");
const lessonRoutes = require("./routes/lesson.routes");

const paymentRoutes = require("./routes/payment.routes");

const notificationRoutes = require("./routes/notification.routes");

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);


app.get("/", (req, res) => {
  res.send("driveEASE API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});