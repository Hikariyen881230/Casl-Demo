import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { selectAbility } from "../store/auth-slice";

const ProtectedRoute = ({ subject }) => {
  const ability = useSelector(selectAbility);

  if (ability.can("view", subject)) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
