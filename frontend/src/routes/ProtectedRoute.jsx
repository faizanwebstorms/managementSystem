import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Simple auth check

  return isAuthenticated ? (
    <div className="public-layout">
      <Outlet />
    </div>
  ) : (
    // children we can also add children excpet outlet but some issue with that see later
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
