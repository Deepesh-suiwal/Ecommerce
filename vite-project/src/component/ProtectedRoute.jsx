import { useContext, useEffect, useState } from "react";
import Login from "./Login";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { cartContext } from "../Home";

function ProtectedRoute({ children }) {
  

  const { isAuthenticated, fetchStatus, loading } =
    useContext(cartContext);

  useEffect(() => {
    fetchStatus();
  }, []);

  // console.log(isAuthenticated);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
