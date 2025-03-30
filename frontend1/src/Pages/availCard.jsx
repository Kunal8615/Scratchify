import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { API_URL } from '../constant.js';
import { useNavigate } from 'react-router-dom';

const AvailCard = () => {
  const { decryptedData } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);

  // Company logos/icons mapping (you can add more)
  const companyIcons = {
    myntra: "👕",
    flipkart: "🛒",
    amazon: "📦",
    ajio: "👗",
    default: "🎟️"
  };

  const getCompanyIcon = (company) => {
    return companyIcons[company?.toLowerCase()] || companyIcons.default;
  };

  const router = () => {
    navigate("/layout");
  }

  useEffect(() => {
    if (!decryptedData) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/cards/decryptCode/${decryptedData}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);

        // ✅ Only delete the card if data retrieval is successful
        await fetch(`${API_URL}/cards/cardUsed/${decryptedData}`, {
          method: "DELETE",
          credentials: "include",
        });

      } catch (error) {
        console.error("❌ Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decryptedData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <p className="mt-4 text-gray-400">Loading your card details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black p-4">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button 
            onClick={router}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black p-4">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">No data found</p>
          <button 
            onClick={router}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition duration-300"
          >
            Explore More Cards
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="relative group">
          {/* Background Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          
          {/* Main Card */}
          <div className="relative bg-gray-900 border border-purple-500/20 rounded-lg p-6 sm:p-8">
            {/* Company Badge */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform duration-300">
              {getCompanyIcon(data?.company)}
            </div>

            {/* Header */}
            <div className="flex items-center mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                  {data?.company?.toUpperCase() || 'Scratch Card'}
                </h2>
                <p className="text-gray-400 text-sm mt-1">Card Details</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-4">
              {/* Company Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center py-3 border-b border-purple-500/10">
                <span className="text-gray-400 font-medium">Company</span>
                <span className="sm:col-span-2 text-white flex items-center gap-2">
                  {getCompanyIcon(data?.company)}
                  {data?.company?.toUpperCase()}
                </span>
              </div>

              {/* Add Upload Date Row - Add this new section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center py-3 border-b border-purple-500/10">
                <span className="text-gray-400 font-medium">Upload Date</span>
                <span className="sm:col-span-2 text-white">
                  {new Date(data?.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              {/* Code Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center py-3 border-b border-purple-500/10">
                <span className="text-gray-400 font-medium">Code</span>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <code className="text-white font-mono bg-gray-800 px-3 py-1 rounded flex-1">
                    {data?.code}
                  </code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(data?.code);
                      alert('Code copied!');
                    }}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    📋
                  </button>
                </div>
              </div>

              {/* Owner Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center py-3 border-b border-purple-500/10">
                <span className="text-gray-400 font-medium">Owner</span>
                <span className="sm:col-span-2 text-white">{data.owner}</span>
              </div>

              {/* Validity Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center py-3 border-b border-purple-500/10">
                <span className="text-gray-400 font-medium">Validity</span>
                <span className="sm:col-span-2 text-white">{data?.validity}</span>
              </div>

              {/* Description Row - Now Clickable */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center py-3 border-b border-purple-500/10">
                <span className="text-gray-400 font-medium">Description</span>
                <span 
                  onClick={() => setShowDescription(true)}
                  className="sm:col-span-2 text-white cursor-pointer hover:text-purple-400 transition-colors line-clamp-2"
                >
                  {data?.description}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(data?.code);
                  alert('Code copied to clipboard!');
                }}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
                  text-white font-medium hover:from-purple-700 hover:to-pink-700 
                  transition duration-300 transform hover:scale-105
                  flex items-center justify-center gap-2"
              >
                <span>Copy Code</span>
                <span>📋</span>
              </button>
              
              <button 
                onClick={router}
                className="flex-1 px-6 py-3 rounded-lg border border-purple-500/50 
                  text-purple-400 font-medium hover:bg-purple-500/10 
                  transition duration-300 transform hover:scale-105
                  flex items-center justify-center gap-2"
              >
                <span>Explore More</span>
                <span>🔍</span>
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-6 text-center">
          <div className="inline-block bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm">
            ✨ Card has been successfully claimed!
          </div>
        </div>

        {/* Description Modal */}
        {showDescription && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 max-w-lg w-full mx-4 transform animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                  {data?.company?.toUpperCase()} - Card Description
                </h3>
                <button 
                  onClick={() => setShowDescription(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-300 mb-6">
                {data?.description}
              </p>
              <button
                onClick={() => setShowDescription(false)}
                className="w-full px-4 py-2 rounded-lg
                  bg-gradient-to-r from-purple-600 to-pink-600
                  text-white text-sm font-medium
                  hover:from-purple-700 hover:to-pink-700
                  transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailCard;
