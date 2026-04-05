import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-core";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const isAr = location.pathname.startsWith("/ar");

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 pt-32">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-[0_24px_70px_rgba(2,6,23,0.45)] backdrop-blur-2xl">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={isAr ? "/ar/" : "/"} replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to={isAr ? "/ar/profile" : "/profile"} replace />;
  }

  return children;
};

export default ProtectedRoute;
