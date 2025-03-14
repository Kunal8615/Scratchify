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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {loading && <p className="mt-4 text-blue-600">Loading data...</p>}

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {data.length > 0 && (
        <div className="mt-4 p-4 border rounded-lg w-80 bg-white shadow-md">
          {/* <h2 className="text-lg font-bold">API Response:</h2> */}
          <ul className="text-sm">
            {data.map((item) => (
              <li key={item._id} className="border-b py-2">
                <strong>Company:</strong> {item.company} <br />
                <strong>Code:</strong> {item._id}
                <button
                onClick={() => decryptCard(item._id)} // ✅ Now using arrow function
                className="mt-3 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full"
              >
                View Details
              </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.length === 0 && !loading && (
        <p className="mt-4 text-gray-600">No data found for this company.</p>
      )}
    </div>
  );
};

export default Coupon;
