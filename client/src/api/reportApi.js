import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reports';

const getToken = () => localStorage.getItem('token');
const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const getStudentReport = () => axios.get(`${API_URL}/students`, authHeader());

export const getInstructorReport = () => axios.get(`${API_URL}/instructors`, authHeader());

export const getFinancialReport = (startDate, endDate) =>
  axios.get(`${API_URL}/financial?startDate=${startDate}&endDate=${endDate}`, authHeader());