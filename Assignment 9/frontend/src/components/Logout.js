import React from "react";
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    console.log("Logout successful");
    onLogout();
    navigate("/login");
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;