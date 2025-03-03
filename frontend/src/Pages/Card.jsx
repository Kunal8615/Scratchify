import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constant";

export default function Card({ company }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchData = async () => {
    if (!company) {
      console.warn("❌ Company prop missing! API call skipped.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`📡 Fetching data for company: ${company}`);

      const response = await axios.get(`${API_URL}/cards/companyCards/${company}`, {
        withCredentials: true, // CORS ke liye credentials allow
      });

      console.log("✅ API Response:", response.data);

      // API response check karo
      if (response.data && response.data.cards) {
        setData(response.data.cards); // Correct structure
      } else {
        console.warn("⚠️ Unexpected API response structure:", response.data);
        setData([]);
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch data when company changes
  useEffect(() => {
    fetchData();
  }, [company]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Clickable Card */}
      <div
        className="w-64 p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition duration-300"
        onClick={fetchData}
      >
        <h2 className="text-xl font-bold text-gray-800">Click to Fetch Data</h2>
        <p className="text-gray-600 mt-2">Click this card to load API data.</p>
      </div>

      {/* Loading State */}
      {loading && <p className="mt-4 text-blue-600">Loading data...</p>}

      {/* Error Message */}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {/* API Response Data */}
      {data && data.length > 0 && (
        <div className="mt-4 p-4 border rounded-lg w-80 bg-white shadow-md">
          <h2 className="text-lg font-bold">API Response:</h2>
          <ul className="text-sm">
            {data.map((item) => (
              <li key={item._id} className="border-b py-2">
                <strong>Company:</strong> {item.company} <br />
                <strong>Code:</strong> {item.code}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No Data Found */}
      {data && data.length === 0 && !loading && (
        <p className="mt-4 text-gray-600">No data found for this company.</p>
      )}
    </div>
  );
}
