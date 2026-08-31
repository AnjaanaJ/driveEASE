const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.test' });

// Runs once before all tests start
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

// Runs once after all tests finish
afterAll(async () => {
  await mongoose.connection.close();
});