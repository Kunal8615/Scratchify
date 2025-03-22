import React from 'react'
import Card from '../Pages/Card.jsx'
import Search from './Search.jsx';
import background from "../images/background.png";

function FrontPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section - Top */}
        <div className="mb-8 w-full max-w-2xl mx-auto">
          <Search />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Each card wrapped in animated container */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <Card 
              company="myntra" 
              className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                backdrop-blur-sm border border-purple-500/20 rounded-xl 
                shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
            />
          </div>

          <div className="transform hover:scale-105 transition-transform duration-300">
            <Card 
              company="flipkart" 
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                backdrop-blur-sm border border-blue-500/20 rounded-xl 
                shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
            />
          </div>

          <div className="transform hover:scale-105 transition-transform duration-300">
            <Card 
              company="ajio" 
              className="bg-gradient-to-r from-pink-500/10 to-red-500/10 
                backdrop-blur-sm border border-pink-500/20 rounded-xl 
                shadow-[0_0_15px_rgba(236,72,153,0.2)]" 
            />
          </div>

          <div className="transform hover:scale-105 transition-transform duration-300">
            <Card 
              company="amazone" 
              className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                backdrop-blur-sm border border-purple-500/20 rounded-xl 
                shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
            />
          </div>
        </div>

        {/* Optional: Add more sections */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Popular Deals
          </h2>
          <p className="mt-2 text-gray-400">
            Discover the most exchanged scratch cards this week
          </p>
        </div>

        {/* Loading State Placeholder */}
        <div className="hidden">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
