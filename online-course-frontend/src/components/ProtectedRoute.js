import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api/authService";

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;
