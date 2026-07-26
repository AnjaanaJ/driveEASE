import axiosInstance from "./axiosInstance";

export const bookLesson = (lessonData) => axiosInstance.post("/lessons", lessonData);
export const getAllLessons = () => axiosInstance.get("/lessons");
export const getLessonById = (id) => axiosInstance.get(`/lessons/${id}`);
export const getLessonsByStudent = (studentId) => axiosInstance.get(`/lessons/student/${studentId}`);
export const getLessonsByInstructor = (instructorId) => axiosInstance.get(`/lessons/instructor/${instructorId}`);
export const updateLesson = (id, updates) => axiosInstance.put(`/lessons/${id}`, updates);
export const cancelLesson = (id) => axiosInstance.delete(`/lessons/${id}`);
export const getAvailableSlots = (date, instructorId, vehicleId) =>
  axiosInstance.get("/lessons/available-slots", { params: { date, instructorId, vehicleId } });