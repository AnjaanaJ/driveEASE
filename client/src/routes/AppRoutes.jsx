import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

// Auth
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Public Pages
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// Dashboard Pages
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import InstructorDashboardPage from "../pages/instructor/InstructorDashboardPage";
import StudentDashboardPage from "../pages/student/StudentDashboardPage";

// Instructor Management
import InstructorListPage from "../pages/admin/InstructorListPage";
import InstructorDetailPage from "../pages/admin/InstructorDetailPage";
import InstructorPerformancePage from "../pages/admin/InstructorPerformancePage";

// Vehicle Management
import VehicleListPage from "../pages/admin/VehicleListPage";
import VehicleDetailPage from "../pages/admin/VehicleDetailPage";
import VehicleMaintenancePage from "../pages/admin/VehicleMaintenancePage";

// Student
import StudentRegistrationPage from "../pages/student/StudentRegistrationPage";
import PaymentHistoryPage from "../pages/student/PaymentHistoryPage";
import StudentListPage from "../pages/student/StudentListPage";
import StudentProfilePage from "../pages/student/StudentProfilePage";

// Courses
import CoursePackagesPage from "../pages/courses/CoursePackagesPage";
import AdminCourseManagementPage from "../pages/admin/AdminCourseManagementPage";

// Lessons
import LessonDetailPage from "../pages/lessons/LessonDetailPage";
import NotificationsPage from "../pages/lessons/NotificationsPage";
import LessonManagementPage from "../pages/lessons/LessonManagementPage";

// Payments
import PaymentListPage from "../pages/admin/PaymentListPage";

// Users
import AdminUserManagementPage from "../pages/admin/AdminUserManagementPage";
import AdminSystemSettingsPage from "../pages/admin/AdminSystemSettingsPage";
import ChangePasswordPage from "../pages/auth/ChangePasswordPage";

import PendingApprovalPage from "../pages/PendingApprovalPage";

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
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

        {/* ================= VEHICLE MANAGEMENT ================= */}

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

        {/* ================= INSTRUCTOR MANAGEMENT ================= */}

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

        {/* ================= COURSE MANAGEMENT ================= */}

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminCourseManagementPage />
            </ProtectedRoute>
          }
        />

        {/* ================= INSTRUCTOR ================= */}

        <Route
          path="/instructor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ================= STUDENT ================= */}

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

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentProfilePage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <StudentListPage />
            </ProtectedRoute>
          }
        />

        {/* ================= LESSONS ================= */}

        <Route
          path="/lessons/:id"
          element={
            <ProtectedRoute allowedRoles={["admin", "student", "instructor"]}>
              <LessonDetailPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/lessons"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <LessonManagementPage />
            </ProtectedRoute>  

          }
        />

        <Route
          path="/student/lessons"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <LessonManagementPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/lessons"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <LessonManagementPage />
            </ProtectedRoute>
          }
        />
        
        {/* ================= NOTIFICATIONS ================= */}

        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={["admin", "student", "instructor"]}>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
         

        {/* ================= PAYMENTS ================= */}

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

        {/* ================= USERS ================= */}

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUserManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminSystemSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePasswordPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/pending-approval" element={<PendingApprovalPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
