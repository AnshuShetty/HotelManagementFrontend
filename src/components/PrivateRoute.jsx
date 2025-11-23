// PrivateRoute.jsx

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ type }) => {
  const token = localStorage.getItem("token");
  const storedUserRaw = localStorage.getItem("user");
  let user = null;

  // Safely parse user: allow either JSON string (object) or plain string (name)
  try {
    user = storedUserRaw ? JSON.parse(storedUserRaw) : null;
  } catch {
    user = storedUserRaw || null;
  }

  // Determine role: prefer explicit stored 'role', fallback to user.role if available
  const storedRole = localStorage.getItem("role");
  const roleFromUser =
    typeof user === "object" && user?.role ? String(user.role) : null;
  const role = storedRole || roleFromUser || null;

  // Debug logs
  console.log("PrivateRoute user:", user);
  console.log("PrivateRoute role:", role);

  // Choose redirect path based on requested route type
  const loginPath =
    String(type || "").toUpperCase() === "ADMIN" ? "/admin/login" : "/login";

  // Not authenticated -> redirect to appropriate login
  if (!token || !user) return <Navigate to={loginPath} replace />;

  // If a type is required, validate role (case-insensitive)
  if (type) {
    const required = String(type).toUpperCase();
    const current = role ? String(role).toUpperCase() : null;

    // For USER routes: allow when role is missing or equals USER (to support older saves)
    if (required === "USER") {
      if (current && current !== "USER")
        return <Navigate to={loginPath} replace />;
    } else {
      // For ADMIN or other specific roles require exact match
      if (current !== required) return <Navigate to={loginPath} replace />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
