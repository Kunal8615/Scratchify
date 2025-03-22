import React, { useState, useEffect } from "react";
import { API_URL } from "../constant";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const navigate = useNavigate();

  // API call function
  const fetchData = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setData([]);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/cards/searchCard?searchQuery=${searchQuery}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ✅ Decrypt function
  const decryptCard = async (cardId) => {
    try {
      const response = await fetch(`${API_URL}/cards/decryptCode/${cardId}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const decryptedData = await response.json();
        if (decryptedData) {
          navigate(`/layout/availCoupan/${decryptedData._id}`);
        }
      }
    } catch (error) {
      console.error("Error decrypting card:", error);
    }
  };

  // Modified check function with confirmation
  const handleCardClick = (cardId) => {
    setSelectedCardId(cardId);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (selectedCardId) {
      try {
        const response = await fetch(`${API_URL}/users/getUser`, {
          credentials: "include",
          method: "GET",
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
    
        const userData = await response.json();
    
        if (userData.data.remainingToAvail == 0) {
          alert("Remaining card to avail is 0, please upload a card");
          navigate("/layout/uploadcard");
        } else {
          decryptCard(selectedCardId); 
        }
      } catch (error) {
        console.error("Error in check function:", error);
        decryptCard(selectedCardId);
      }
    }
    setShowConfirm(false);
  };
  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData(query);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Search Input */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scratch cards..."
            className="w-full px-6 py-3 bg-gray-900 
              border border-purple-500/30 rounded-lg
              text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-500
              transition duration-300"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm 
              border border-gray-700/50 rounded-xl p-6 
              hover:shadow-xl hover:shadow-purple-500/10 
              transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              {/* Company & Validity */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                  {item.company}
                </h3>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {item.validity || 'Limited Time'}
                </span>
              </div>

              {/* Description */}
              <div className="flex-grow">
                <p className="text-gray-300 line-clamp-2 min-h-[48px]">
                  {item.description}
                </p>
              </div>

              {/* Button Section */}
              <div className="mt-6">
                <button
                  onClick={() => handleCardClick(item._id)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 
                    hover:from-purple-700 hover:to-pink-700 text-white 
                    py-3 px-4 rounded-lg font-medium 
                    transition-all duration-200 transform hover:scale-[1.02]
                    flex items-center justify-center gap-2"
                >
                  <span>View Details</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 max-w-sm w-full mx-4 transform animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-4">
              Confirm Action
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to view the details of this scratch card?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 rounded-lg
                  bg-gradient-to-r from-purple-600 to-pink-600
                  text-white text-sm font-medium
                  hover:from-purple-700 hover:to-pink-700
                  transition duration-200"
              >
                Proceed
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg
                  border border-gray-600
                  text-gray-300 text-sm font-medium
                  hover:bg-gray-800
                  transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {data.length === 0 && query.trim() && (
        <div className="text-center mt-8 text-gray-400">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};

export default Search;
