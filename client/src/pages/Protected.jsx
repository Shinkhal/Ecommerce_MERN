import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Wrap this around <Route> groups that need auth.
 *
 * @param {boolean} isAdmin – if true, only admin users can pass
 */
const ProtectedRoute = ({ isAdmin = false }) => {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  // Optionally return a spinner while auth state is loading
  if (loading) return null;

  // Not logged in → kick to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin where admin is required → kick to login
  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // All good → render whatever child routes were declared
  return <Outlet />;
};

export default ProtectedRoute;
