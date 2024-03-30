import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProcetedRoutes = ({ isAuth, children }) => {
  if (!isAuth) return <Navigate to="/signin" />;
  return children ? children : <Outlet />;
};

export default ProcetedRoutes;
