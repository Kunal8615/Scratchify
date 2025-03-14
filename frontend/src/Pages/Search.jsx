import React, { useState, useEffect } from "react";
import { API_URL } from "../constant";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
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

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData(query);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center space-x-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search files..."
          className="border rounded-lg px-4 py-2 w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-lg font-medium text-gray-800 truncate">
                {item.description}
              </h3>

              {/* ✅ Fix: Arrow function se call karo */}
              <button
                onClick={() => decryptCard(item._id)} // ✅ Now using arrow function
                className="mt-3 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && query.trim() && (
        <p className="text-center text-gray-500 mt-6 text-green-500">
          No results found. Try another search.
        </p>
      )}
    </div>
  );
};

export default Search;
