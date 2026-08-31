const request = require('supertest');
const app = require('./testApp');
require('./setup'); // connects to test DB before tests, closes after

describe('GET /api/courses', () => {
  it('should return status 200 and an array of courses', async () => {
    const res = await request(app).get('/api/courses');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});