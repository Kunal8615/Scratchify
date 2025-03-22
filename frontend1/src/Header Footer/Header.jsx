import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800">
      <style>
        {`
          .gradient-text {
            background: linear-gradient(
              to right,
              #a855f7,
              #ec4899,
              #ef4444,
              #eab308,
              #22c55e,
              #3b82f6,
              #a855f7
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            background-size: 400% auto;
            animation: gradient 10s linear infinite;
          }

          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 400% 50%;
            }
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/exchange" className="group">
              <div className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-2 rounded-lg group-hover:from-purple-500/30 group-hover:to-pink-500/30">
                  🎟️
                </span>
                <span className="group-hover:text-purple-400">Exchange</span>
              </div>
            </Link>
            <Link to="/deals" className="group">
              <div className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-2 rounded-lg group-hover:from-purple-500/30 group-hover:to-pink-500/30">
                  💰
                </span>
                <span className="group-hover:text-purple-400">Deals</span>
              </div>
            </Link>
          </div>

          {/* Center Logo */}
          <div className="flex-1 flex justify-center md:flex-none md:justify-start">
            <Link to="/" className="group">
              <h1 className="gradient-text text-2xl sm:text-3xl md:text-4xl font-extrabold hover:scale-105 transition-transform duration-200">
                SCRATCHIFY
              </h1>
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105">
              Upload Card
            </button>
            <button className="border-2 border-purple-500 text-purple-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-500 hover:text-white transition-all duration-200 transform hover:scale-105">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/50 backdrop-blur-sm">
              <Link to="/exchange" className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                <span>🎟️</span>
                <span>Exchange Cards</span>
              </Link>
              <Link to="/deals" className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                <span>💰</span>
                <span>Best Deals</span>
              </Link>
              <div className="pt-4 space-y-3 px-3">
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Upload Card
                </button>
                <button className="w-full border-2 border-purple-500 text-purple-400 px-4 py-2 rounded-full text-sm font-medium">
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
    </nav>
  );
}

export default Header;
