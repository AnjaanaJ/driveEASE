import axiosInstance from "../services/axiosInstance";

// Create a new student profile
export const createStudent = async (studentData) => {
  const res = await axiosInstance.post("/students", studentData);
  return res.data;
};

// Get all students (admin only)
export const getAllStudents = async (search = "") => {
  const res = await axiosInstance.get(`/students?search=${search}`);
  return res.data;
};

// Get single student by id
export const getStudentById = async (id) => {
  const res = await axiosInstance.get(`/students/${id}`);
  return res.data;
};

// Get student profile by userId (own profile view)
export const getStudentByUserId = async (userId) => {
  const res = await axiosInstance.get(`/students/me/${userId}`);
  return res.data;
};

// Update student profile
export const updateStudent = async (id, updatedData) => {
  const res = await axiosInstance.put(`/students/${id}`, updatedData);
  return res.data;
};

// Delete student (admin only)
export const deleteStudent = async (id) => {
  const res = await axiosInstance.delete(`/students/${id}`);
  return res.data;
};