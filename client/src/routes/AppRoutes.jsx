import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import InstructorDashboardPage from "../pages/instructor/InstructorDashboardPage";
import StudentDashboardPage from "../pages/student/StudentDashboardPage";

import InstructorListPage from "../pages/admin/InstructorListPage";
import VehicleListPage from "../pages/admin/VehicleListPage";
import InstructorDetailPage from "../pages/admin/InstructorDetailPage";
import VehicleDetailPage from "../pages/admin/VehicleDetailPage";

import InstructorPerformancePage from "../pages/admin/InstructorPerformancePage";
import VehicleMaintenancePage from "../pages/admin/VehicleMaintenancePage";

import StudentRegistrationPage from "../pages/student/StudentRegistrationPage";
import CoursePackagesPage from "../pages/courses/CoursePackagesPage";
import AdminCourseManagementPage from "../pages/admin/AdminCourseManagementPage";

import LessonBookingPage from "../pages/lessons/LessonBookingPage";
import LessonListPage from "../pages/lessons/LessonListPage";
import LessonDetailPage from "../pages/lessons/LessonDetailPage";
import NotificationsPage from "../pages/lessons/NotificationsPage";
import LessonCalendarPage from "../pages/lessons/LessonCalendarPage";

import PaymentListPage from "../pages/admin/PaymentListPage";
import PaymentHistoryPage from "../pages/student/PaymentHistoryPage";

import AdminUserManagementPage from "../pages/admin/AdminUserManagementPage";


function AppRoutes() {

  return (
    <Routes>

      {/* Public Website */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursePackagesPage />} />
      </Route>


      {/* Authentication */}
      <Route element={<AuthLayout />}>

        <Route 
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

      </Route>


      {/* Dashboard */}
      <Route element={<DashboardLayout />}>

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />


        {/* Vehicle Management */}
        <Route
          path="/admin/vehicles"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <VehicleListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vehicles/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <VehicleDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vehicles/:id/maintenance"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <VehicleMaintenancePage />
            </ProtectedRoute>
          }
        />


        {/* Instructor Management */}
        <Route
          path="/admin/instructors"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <InstructorListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/instructors/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <InstructorDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/instructors/:id/performance"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <InstructorPerformancePage />
            </ProtectedRoute>
          }
        />


        {/* Course Management */}
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminCourseManagementPage />
            </ProtectedRoute>
          }
        />


        {/* Instructor */}
        <Route
          path="/instructor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorDashboardPage />
            </ProtectedRoute>
          }
        />


        {/* Student */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/register-profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentRegistrationPage />
            </ProtectedRoute>
          }
        />


        {/* Lessons */}
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
            <ProtectedRoute allowedRoles={["admin","student","instructor"]}>
              <LessonDetailPage />
            </ProtectedRoute>
          }
        />


        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={["admin","student","instructor"]}>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/lessons/calendar"
          element={
            <ProtectedRoute allowedRoles={["admin","student","instructor"]}>
              <LessonCalendarPage />
            </ProtectedRoute>
          }
        />


        {/* Payments */}
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


        {/* Users */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUserManagementPage />
            </ProtectedRoute>
          }
        />

      </Route>


      {/* 404 */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />

    </Routes>
  );
}


export default AppRoutes;