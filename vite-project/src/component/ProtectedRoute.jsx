import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckingStatus(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
