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


function AppRoutes() {

  return (
    <Routes>

      {/* Public Website */}
      <Route element={<MainLayout />}>

        <Route 
          path="/" 
          element={<HomePage />} 
        />

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


        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />


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