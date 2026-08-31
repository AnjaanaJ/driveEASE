const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./testApp');
require('./setup');

const User = require('../models/User');
const generateToken = require('../utils/generateToken');

describe('GET /api/students', () => {
  let adminToken;

  // Runs once before the tests in this file
  beforeAll(async () => {
    // create a fake admin user directly in the test database
    const adminUser = await User.create({
      name: 'Test Admin',
      email: 'testadmin@example.com',
      password: 'hashedpassword123', // not logging in, so plain text is fine here
      role: 'admin',
      isApproved: true,
    });

    // generate a real JWT token for this user, same way login does
    adminToken = generateToken(adminUser._id, adminUser.role);
  });

  // Clean up the test user after this file's tests finish
  afterAll(async () => {
    await User.deleteMany({ email: 'testadmin@example.com' });
  });

  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/api/students');
    expect(res.statusCode).toBe(401);
  });

  it('should return 200 and an array when a valid admin token is provided', async () => {
    const res = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});