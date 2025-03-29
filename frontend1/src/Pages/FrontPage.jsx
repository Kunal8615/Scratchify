import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Pages/Card.jsx'
import Search from './Search.jsx';
import background from "../images/background.png";
import bg1 from "../images/bg1.jpg";

function FrontPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = async (route) => {
    //setIsLoading(true);
    try {
    //  await new Promise(resolve => setTimeout(resolve, 2000));
     // navigate(route);
    } catch (error) {
      console.error('Navigation error:', error);
      setIsLoading(false); // Reset loading state if error occurs
    }
  };

  return (
    <div className="min-h-screen relative">
      <style>
        {`
          @keyframes loadingAnimation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255,255,255,0.1);
            border-radius: 50%;
            border-top-color: #fff;
            animation: loadingAnimation 0.8s linear infinite;
          }
          @media (max-width: 640px) {
            .card-hover:active {
              transform: scale(0.98);
            }
          }
          @keyframes border-flow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .neon-border-purple {
            background: linear-gradient(
              90deg,
              #a855f7,
              #ec4899,
              #a855f7
            );
            background-size: 200% auto;
            animation: border-flow 3s linear infinite;
          }
          .neon-border-blue {
            background: linear-gradient(
              90deg,
              #3b82f6,
              #06b6d4,
              #3b82f6
            );
            background-size: 200% auto;
            animation: border-flow 3s linear infinite;
          }
          .neon-border-pink {
            background: linear-gradient(
              90deg,
              #ec4899,
              #f43f5e,
              #ec4899
            );
            background-size: 200% auto;
            animation: border-flow 3s linear infinite;
          }
          .neon-border-green {
            background: linear-gradient(
              90deg,
              #22c55e,
              #10b981,
              #22c55e
            );
            background-size: 200% auto;
            animation: border-flow 3s linear infinite;
          }
        `}
      </style>

      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
          {/* Search Section */}
          <div className="mb-6 sm:mb-12 w-full max-w-2xl mx-auto">
            <Search />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
            {/* Myntra Card */}
            <div 
              className="relative group card-hover cursor-pointer touch-manipulation"
              onClick={() => handleCardClick('/myntra-exchange')}
            >
              <div className="absolute -inset-[2px] neon-border-purple rounded-xl opacity-75 group-hover:opacity-100 group-active:opacity-100 blur-[2px] group-hover:blur-[3px]"></div>
              <div className="relative bg-black rounded-xl p-4 sm:p-5">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <span className="text-purple-500 text-sm font-medium">Myntra</span>
                  <span className="bg-purple-500/10 text-purple-500 text-xs font-semibold px-2 py-1 rounded-full">
                    HOT
                  </span>
                </div>
                <Card company="myntra" className="w-full" />
              </div>
            </div>

            {/* Flipkart Card */}
            <div 
              className="relative group card-hover cursor-pointer touch-manipulation"
              onClick={() => handleCardClick('/flipkart-exchange')}
            >
              <div className="absolute -inset-[2px] neon-border-blue rounded-xl opacity-75 group-hover:opacity-100 group-active:opacity-100 blur-[2px] group-hover:blur-[3px]"></div>
              <div className="relative bg-black rounded-xl p-4 sm:p-5">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <span className="text-blue-500 text-sm font-medium">Flipkart</span>
                  <span className="bg-blue-500/10 text-blue-500 text-xs font-semibold px-2 py-1 rounded-full">
                    NEW
                  </span>
                </div>
                <Card company="flipkart" className="w-full" />
              </div>
            </div>

            {/* Ajio Card */}
            <div 
              className="relative group card-hover cursor-pointer touch-manipulation"
              onClick={() => handleCardClick('/ajio-exchange')}
            >
              <div className="absolute -inset-[2px] neon-border-pink rounded-xl opacity-75 group-hover:opacity-100 group-active:opacity-100 blur-[2px] group-hover:blur-[3px]"></div>
              <div className="relative bg-black rounded-xl p-4 sm:p-5">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <span className="text-pink-500 text-sm font-medium">Ajio</span>
                  <span className="bg-pink-500/10 text-pink-500 text-xs font-semibold px-2 py-1 rounded-full">
                    TREND
                  </span>
                </div>
                <Card company="ajio" className="w-full" />
              </div>
            </div>

            {/* Amazon Card */}
            <div 
              className="relative group card-hover cursor-pointer touch-manipulation"
              onClick={() => handleCardClick('/amazon-exchange')}
            >
              <div className="absolute -inset-[2px] neon-border-green rounded-xl opacity-75 group-hover:opacity-100 group-active:opacity-100 blur-[2px] group-hover:blur-[3px]"></div>
              <div className="relative bg-black rounded-xl p-4 sm:p-5">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <span className="text-green-500 text-sm font-medium">Amazon</span>
                  <span className="bg-green-500/10 text-green-500 text-xs font-semibold px-2 py-1 rounded-full">
                    BEST
                  </span>
                </div>
                <Card company="amazone" className="w-full" />
              </div>
            </div>
          </div>

          {/* Popular Deals Section */}
          <div className="mt-8 sm:mt-16 text-center px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Popular Deals
            </h2>
            <p className="mt-2 sm:mt-3 text-gray-400 text-sm sm:text-base">
              Discover the most exchanged scratch cards this week
            </p>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default FrontPage;
