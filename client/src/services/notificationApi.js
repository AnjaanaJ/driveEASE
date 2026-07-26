import axiosInstance from "./axiosInstance";

export const getNotifications = (userId) => axiosInstance.get(`/notifications/${userId}`);
export const markNotificationRead = (id) => axiosInstance.put(`/notifications/${id}/read`);
export const markAllNotificationsRead = (userId) => axiosInstance.put(`/notifications/read-all/${userId}`);