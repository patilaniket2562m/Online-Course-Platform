import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api/authService";

const AdminRoute = ({ children }) => {
  const user = getCurrentUser();
  if (!user || user.role !== "ADMIN") return <Navigate to="/" />;
  return children;
};

export default AdminRoute;
