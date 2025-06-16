import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const naviagte = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      naviagte("/login");
    }
  }, []);

  return user ? children : null;
}

export default ProtectedRoute;
