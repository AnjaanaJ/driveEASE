import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace/>;
  }
if (user.isApproved === false) {
  return <Navigate to="/pending-approval" replace />;
}
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;