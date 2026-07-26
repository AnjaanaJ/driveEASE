import axiosInstance from "../services/axiosInstance";

// Get all course packages (public)
export const getAllCourses = async () => {
  const res = await axiosInstance.get("/courses");
  return res.data;
};

// Get single course by id (public)
export const getCourseById = async (id) => {
  const res = await axiosInstance.get(`/courses/${id}`);
  return res.data;
};

// Create a new course package (admin only)
export const createCourse = async (courseData) => {
  const res = await axiosInstance.post("/courses", courseData);
  return res.data;
};

// Update a course package (admin only)
export const updateCourse = async (id, updatedData) => {
  const res = await axiosInstance.put(`/courses/${id}`, updatedData);
  return res.data;
};

// Delete a course package (admin only)
export const deleteCourse = async (id) => {
  const res = await axiosInstance.delete(`/courses/${id}`);
  return res.data;
};