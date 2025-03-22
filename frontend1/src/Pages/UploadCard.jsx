import React, { useState } from "react";
import { API_URL } from "../constant.js";
import { useNavigate } from "react-router-dom";

const UploadCard = () => {
  const [company, setCompany] = useState("");
  const [code, setCode] = useState("");
  const [validity, setValidity] = useState("");
  const [description, setDescription] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("company", company);
    form.append("code", code);
    form.append("validity", validity);
    form.append("description", description);

    try {
      const res = await fetch(`${API_URL}/cards/uploadCard`, {
        method: "POST",
        credentials: "include",
        body: form, 
      });

      const result = await res.json();
      if (result.success) {
        // Show success toast
        setShowToast(true);
        
        // Reset form
        setCompany("");
        setCode("");
        setValidity("");
        setDescription("");
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/layout");
        }, 2000);
      } else {
        alert("Failed to add coupon ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black p-4 md:p-8 relative">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 flex items-center gap-2 bg-green-500/90 text-white px-6 py-3 rounded-xl shadow-xl backdrop-blur-sm animate-fade-in-down z-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span className="font-medium">Card Successfully Uploaded!</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Form Section */}
          <div className="lg:w-2/3">
            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse mb-3">
                Upload Your Card
              </h2>
              <p className="text-gray-400 text-lg">Share your unused coupons with our community ✨</p>
            </div>

            {/* Form Card */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company & Validity Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                      Company Name
                    </label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g., Amazon, Flipkart"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 placeholder-gray-500 transition-all duration-300"
          required
        />
                  </div>

                  {/* Validity Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Validity Period
                    </label>
        <input
          type="text"
                      value={validity}
                      onChange={(e) => setValidity(e.target.value)}
                      placeholder="e.g., 1d, 2d, 3d"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 placeholder-gray-500 transition-all duration-300"
          required
        />
                  </div>
                </div>

                {/* Coupon Code Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                    </svg>
                    Coupon Code
                  </label>
        <input
          type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter your coupon code"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 placeholder-gray-500 transition-all duration-300"
          required
        />
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
                    </svg>
                    Description
                  </label>
                  <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your coupon details and any special conditions"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 placeholder-gray-500 transition-all duration-300 min-h-[120px]"
          required
        />
                </div>

                {/* Submit Button */}
        <button
          type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-3"
        >
                  <span className="text-lg">Upload Card</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                  </svg>
        </button>
      </form>
            </div>
          </div>

          {/* Right Side - Info Section */}
          <div className="lg:w-1/3 space-y-6">
            {/* Benefits Card */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                Benefits of Sharing
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="p-1 bg-purple-500/20 rounded-full">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  <span className="text-gray-300">Help others save money</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="p-1 bg-purple-500/20 rounded-full">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  <span className="text-gray-300">Earn community points</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="p-1 bg-purple-500/20 rounded-full">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  <span className="text-gray-300">Access exclusive deals</span>
                </li>
              </ul>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                Upload Tips
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">01</span>
                  <span className="text-gray-300">Verify the coupon code before uploading</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">02</span>
                  <span className="text-gray-300">Check and confirm validity period</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">03</span>
                  <span className="text-gray-300">Add detailed description for better visibility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these styles to your CSS or Tailwind config
const styles = `
  @keyframes fade-in-down {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-down {
    animation: fade-in-down 0.5s ease-out;
  }
`;

export default UploadCard;
