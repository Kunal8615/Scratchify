import React from "react";
import { useNavigate } from "react-router-dom";

const companies = [
  { name: "Flipkart", color: "bg-yellow-500" },
  { name: "Amazon", color: "bg-green-500" },
  { name: "myntra", color: "bg-blue-500" },
  { name: "Meesho", color: "bg-red-500" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleRedirect = (company) => {
    navigate(`/company/${company.toLowerCase()}`);
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 p-10 bg-gray-100 min-h-screen">
      {companies.map(({ name, color }) => (
        <div
          key={name}
          className={`p-6 w-40 md:w-52 h-40 flex flex-col items-center justify-center text-white text-center ${color} rounded-lg cursor-pointer shadow-lg border border-gray-300 hover:scale-105 transition-transform`}
          onClick={() => handleRedirect(name)}
        >
          <h2 className="text-lg font-bold uppercase">{name}</h2>
          <p className="text-sm">Click to see coupons</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
