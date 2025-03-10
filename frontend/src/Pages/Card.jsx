import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ company }) => {
  const navigate = useNavigate();

  // ✅ Uppercase conversion sahi tariqe se
  const text = company?.toUpperCase() ;

  const handleClick = () => {
    if (company) {
      navigate(`/layout/company/${company}`);
    } else {
      console.warn("❌ Company prop missing! Cannot redirect.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div
        className="w-64 p-6 bg-blue-500 text-white rounded-lg shadow-lg cursor-pointer hover:bg-blue-600 transition duration-300"
        onClick={handleClick}
      >
        <h2 className="text-xl font-bold text-center">{text}</h2>  
      </div>
    </div>
  );
};

export default Card;
