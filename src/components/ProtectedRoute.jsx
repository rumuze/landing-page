import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-core";
import LoadingSpinner from "./LoadingSpinner";
import { localeFromPath } from "../seo/linking";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const isAr = localeFromPath(location.pathname) === "ar";

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 pt-32">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={isAr ? "/" : "/en"} replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to={isAr ? "/profile" : "/en/profile"} replace />;
  }

  return children;
};

export default ProtectedRoute;
