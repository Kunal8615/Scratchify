import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { API_URL } from '../constant';
import { Link, useNavigate } from 'react-router-dom';
import bgupload from "../images/bgupload.jpg";
import background from "../images/background.png";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Ensures that cookies are sent with the request
      });


      if (response.status !== 200) {
        throw new Error('Login failed! Please check your credentials.');
      }

      console.log('Login successful:');

      navigate('/layout');
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ 
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        backgroundSize: 'cover',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Container */}
      <div className="relative z-10 w-[90%] max-w-md mx-auto px-4">
        {/* Main Card */}
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md 
          border border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-2xl">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-text bg-200%">
              SCRATCHIFY
            </h2>
            <p className="text-gray-300 mt-2">Welcome back! Please login to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl 
                  text-gray-200 placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                  transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl 
                  text-gray-200 placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                  transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 
                hover:from-purple-700 hover:to-pink-700 
                text-white py-3 px-4 rounded-xl font-medium
                transition-all duration-200 transform hover:scale-[1.02]
                flex items-center justify-center gap-2"
            >
              <span>Login</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-gray-300 text-sm text-center mt-8">
          By logging in, you agree to our{' '}
          <a href="#" className="text-purple-300 hover:text-purple-400 hover:underline transition-colors">
            Terms of Service
          </a>
          {' '}and{' '}
          <a href="#" className="text-purple-300 hover:text-purple-400 hover:underline transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;