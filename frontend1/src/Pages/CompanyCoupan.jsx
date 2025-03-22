import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../constant";
import { useNavigate } from "react-router-dom";

const Coupon = () => {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

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
        } else {
          throw new Error("Invalid decrypted data format");
        }
      } else {
        throw new Error("Failed to decrypt card code");
      }
    } catch (error) {
      console.error("Error decrypting card:", error);
    }
  };

  const check = async (cardId) => {
    try {
      const response = await fetch(`${API_URL}/users/getUser`, {
        credentials: "include",
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
  
      const userData = await response.json();
      console.log(userData);
  
      if (userData.data.remainingToAvail == 0) {
        alert("Remaining card to avail is 0, please upload a card");
        navigate("/layout/uploadcard");
      } else {
        decryptCard(cardId); 
      }
    } catch (error) {
      console.error("Error in check function:", error);
      decryptCard(cardId);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/cards/companyCards/${name}`, {
        credentials: "include", // ✅ Axios ke `withCredentials` ka alternative
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json(); //
    //  console.log("➡️ API Response Data:", result);

      setData(result?.data || []);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name) fetchData(); 
  }, [name]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black p-4 md:p-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse mb-2">
          {name.toUpperCase()} COUPONS
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Discover amazing deals and savings</p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Side - Coupons List */}
        <div className="lg:w-2/3">
          {loading && (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="text-center p-4 bg-red-900/30 backdrop-blur-sm rounded-xl border border-red-700/50 text-red-200">
              {error}
            </div>
          )}

          {data.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {data.map((item) => (
                <div 
                  key={item._id} 
                  className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg transition-all duration-300
                    ${selectedCard === item._id ? 'ring-2 ring-cyan-500 shadow-cyan-500/20' : 'hover:shadow-cyan-500/10'}`}
                >
                  <div className="flex flex-col">
                    {/* Company Name & Validity */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                        {item.company.toUpperCase()}
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {item.validity || 'Limited Time'}
                      </div>
                    </div>

                    {/* Description - Single Line */}
                    <div className="text-gray-300 line-clamp-1 mb-4">
                      {item.description || "No description available"}
                    </div>

                    {/* Bottom Section with Always Visible Avail Button */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-400 font-mono">
                        ID: {item._id.slice(0,8)}...
                      </span>
                      
                      <button
                        onClick={() => check(item._id)}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                      >
                        <span>Avail</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.length === 0 && !loading && (
            <div className="text-center p-8 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
              <div className="text-6xl mb-4">🎫</div>
              <div className="text-xl text-gray-300">
                No coupons found for {name}
              </div>
              <p className="text-gray-400 mt-2">Check back later for new offers!</p>
            </div>
          )}
        </div>

        {/* Right Side - Instructions */}
        <div className="lg:w-1/3 hidden lg:block">
          <div className="sticky top-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
                How It Works
              </h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">1</div>
                  <p>Browse through available coupons from {name}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">2</div>
                  <p>Click "Avail" on any coupon you want to use</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">3</div>
                  <p>Use your coupon before it expires!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this to your CSS/Tailwind
`.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(59, 130, 246, 0.5);
  border-radius: 20px;
}`

export default Coupon;
