// PrivateRoute.jsx

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ type }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Log user and role inside the component
  console.log("PrivateRoute user:", user);
  console.log("PrivateRoute role:", user?.role);

  if (!token || !user) return <Navigate to="/admin/login" replace />;

  if (type && user.role !== type) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
};

export default PrivateRoute;
