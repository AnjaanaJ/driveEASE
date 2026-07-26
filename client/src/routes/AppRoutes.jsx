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
import StudentRegistrationPage from "../pages/student/StudentRegistrationPage";

import LessonBookingPage from "../pages/lessons/LessonBookingPage";
import LessonListPage from "../pages/lessons/LessonListPage";
import LessonDetailPage from "../pages/lessons/LessonDetailPage";
import NotificationsPage from "../pages/lessons/NotificationsPage";

import PaymentListPage from "../pages/admin/PaymentListPage";
import PaymentHistoryPage from "../pages/student/PaymentHistoryPage";


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
          <ProtectedRoute allowedRoles={["admin"]}>
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
           <Route path="/student/register-profile" 
        element={
        <ProtectedRoute allowedRoles={["student"]}>
          <StudentRegistrationPage/>
          </ProtectedRoute>
          }
          />
           
      <Route
          path="/lessons/book"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <LessonBookingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lessons"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <LessonListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons/:id"
          element={
            <ProtectedRoute allowedRoles={["admin", "student", "instructor"]}>
              <LessonDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={["admin", "student", "instructor"]}>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PaymentListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/payments"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <PaymentHistoryPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>


     );
}

export default AppRoutes;