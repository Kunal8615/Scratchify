import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ company, className }) => {
  const navigate = useNavigate();
  const text = company?.toUpperCase();

  const handleClick = () => {
    if (company) {
      navigate(`/layout/company/${company}`);
    } else {
      console.warn("❌ Company prop missing! Cannot redirect.");
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`
        relative group
        w-full max-w-sm mx-auto
        p-6 
        rounded-xl
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:transform hover:scale-[1.02]
        bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10
        backdrop-blur-sm
        border border-purple-500/20
        ${className || ''}
      `}
    >
      {/* Animated Background Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

      {/* Content Container */}
      <div className="relative z-10 space-y-4">
        {/* Company Logo/Icon Placeholder */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-2xl">
            {text?.charAt(0) || '?'}
          </span>
        </div>

        {/* Company Name */}
        <h2 className="text-xl md:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          {text}
        </h2>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-sm text-gray-400">Click to view deals</p>
          <div className="mt-2 flex items-center justify-center space-x-2 text-xs text-gray-500">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
              Active
            </span>
            <span>•</span>
            <span>Multiple Offers</span>
          </div>
        </div>

        {/* Hover Effect Button */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-colors duration-200">
            View Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
