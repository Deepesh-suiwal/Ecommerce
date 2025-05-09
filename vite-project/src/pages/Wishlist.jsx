import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    setTimeout(() => {
      navigate("/login");
    }, 100);
    return;
  }
  
  return <div>Wishlist</div>;
}

export default Wishlist;
