import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import InstructorDashboardPage from "../pages/instructor/InstructorDashboardPage";
import StudentDashboardPage from "../pages/student/StudentDashboardPage";
import AuthLayout from "../layouts/AuthLayout";

function AppRoutes() {
  return (
    <Routes>
      
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<AuthLayout/>}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

    
      
      <Route element={<DashboardLayout />}>
        <Route path="/admin/dashboard"
         element={
          <ProtectedRoute allowRoles={["admin"]}>
            <AdminDashboardPage/>
            </ProtectedRoute>
         } />
        <Route path="/instructor/dashboard"
         element={
          <ProtectedRoute allowedRoles={["instructor"]}>
            <InstructorDashboardPage/>
            </ProtectedRoute>}
             />
        <Route path="/student/dashboard" 
        element={
        <ProtectedRoute allowedRoles={["student"]}>
          <StudentDashboardPage/>
          </ProtectedRoute>
          }
          />
           
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>


     );
}

export default AppRoutes;