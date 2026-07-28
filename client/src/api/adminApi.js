import axiosInstance from "../services/axiosInstance";

// Get all users (admin only)
export const getAllUsers = async () => {
  const res = await axiosInstance.get("/admin/users");
  return res.data;
};

// Approve a user
export const approveUser = async (id) => {
  const res = await axiosInstance.put(`/admin/users/${id}/approve`);
  return res.data;
};

// Reject a user
export const rejectUser = async (id) => {
  const res = await axiosInstance.put(`/admin/users/${id}/reject`);
  return res.data;
};

// Delete a user
export const deleteUser = async (id) => {
  const res = await axiosInstance.delete(`/admin/users/${id}`);
  return res.data;
};

// Change a user's role
export const changeUserRole = async (id, role) => {
  const res = await axiosInstance.put(`/admin/users/${id}/role`, { role });
  return res.data;
};
// Get current system settings
export const getSettings = async () => {
  const res = await axiosInstance.get("/admin/settings");
  return res.data;
};

// Update system settings
export const updateSettings = async (settingsData) => {
  const res = await axiosInstance.put("/admin/settings", settingsData);
  return res.data;
};

// Get system activity logs
export const getActivityLogs = async () => {
  const res = await axiosInstance.get("/admin/logs");
  return res.data;
};