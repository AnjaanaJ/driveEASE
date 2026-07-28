import axios from 'axios';

const API_URL = 'http://localhost:5000/api/dashboard';

const getToken = () => localStorage.getItem('token');
const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const getAdminDashboard = () => axios.get(`${API_URL}/admin`, authHeader());

export const getInstructorDashboard = (id) =>
  axios.get(`${API_URL}/instructor/${id}`, authHeader());

export const getStudentDashboard = (id) =>
  axios.get(`${API_URL}/student/${id}`, authHeader());