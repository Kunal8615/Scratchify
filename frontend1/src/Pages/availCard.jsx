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

  const router = ()=>{
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>No data found</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Decrypted Code Details:</h2>
      <p><strong>ID:</strong> {data._id}</p>
      <p><strong>Code:</strong> {data.code}</p>
      <p><strong>Owner:</strong> {data.owner}</p>
      <p><strong>Validity:</strong> {data.validity}</p>
      <p><strong>Description:</strong> {data.description}</p>
      <button onClick={()=>router()}> Explore More</button>
    </div>
  );
};

export default AvailCard;
