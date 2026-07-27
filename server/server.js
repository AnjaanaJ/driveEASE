const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");
const { startReminderJob } = require("./jobs/reminderJob");

dotenv.config();
connectDB();
startReminderJob();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});