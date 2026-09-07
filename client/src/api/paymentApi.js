import axios from 'axios';

const API_URL = 'http://localhost:5000/api/payments';

const getToken = () => localStorage.getItem('token');
const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const recordPayment = (data) => {
  if (data.receipt instanceof File) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    return axios.post(API_URL, formData, {
      headers: { ...authHeader().headers, 'Content-Type': 'multipart/form-data' },
    });
  }
  return axios.post(API_URL, data, authHeader());
};

export const getAllPayments = () => axios.get(API_URL, authHeader());

export const getPaymentsByStudent = (studentId) =>
  axios.get(`${API_URL}/student/${studentId}`, authHeader());

export const getPaymentById = (id) => axios.get(`${API_URL}/${id}`, authHeader());

export const updatePaymentStatus = (id, status) =>
  axios.put(`${API_URL}/${id}`, { status }, authHeader());

export const getMonthlySummary = () =>
  axios.get(`${API_URL}/summary/monthly`, authHeader());

export const downloadInvoice = async (id) => {
  const res = await axios.get(`${API_URL}/${id}/invoice`, {
    ...authHeader(),
    responseType: 'blob', 
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `invoice-${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const searchStudents = (query) =>
  axios.get(`http://localhost:5000/api/students?search=${query}`, authHeader());