import axiosInstance from "../services/axiosInstance";

// Change password (logged-in user)
export const changePassword = async (currentPassword, newPassword) => {
  const res = await axiosInstance.put("/auth/change-password", {
    currentPassword,
    newPassword,
  });
  return res.data;
};

// Request a password reset token
export const forgotPassword = async (email) => {
  const res = await axiosInstance.post("/auth/forgot-password", { email });
  return res.data;
};

// Reset password using a token
export const resetPassword = async (token, newPassword) => {
  const res = await axiosInstance.post(`/auth/reset-password/${token}`, {
    newPassword,
  });
  return res.data;
};