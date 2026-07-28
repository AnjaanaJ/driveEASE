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

// Courses
import CoursePackagesPage from "../pages/courses/CoursePackagesPage";
import AdminCourseManagementPage from "../pages/admin/AdminCourseManagementPage";

// Lessons
import LessonBookingPage from "../pages/lessons/LessonBookingPage";
import LessonListPage from "../pages/lessons/LessonListPage";
import LessonDetailPage from "../pages/lessons/LessonDetailPage";
import LessonCalendarPage from "../pages/lessons/LessonCalendarPage";
import NotificationsPage from "../pages/lessons/NotificationsPage";

// Payments
import PaymentListPage from "../pages/admin/PaymentListPage";

// Users
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
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <StudentListPage />
            </ProtectedRoute>
          }
        />

        {/* ================= LESSONS ================= */}

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
          path="/lessons/calendar"
          element={
            <ProtectedRoute allowedRoles={["admin", "student", "instructor"]}>
              <LessonCalendarPage />
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
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
