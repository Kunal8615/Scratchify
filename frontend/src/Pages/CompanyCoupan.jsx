import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../constant";

const CompanyCoupons = () => {
  const { name } = useParams();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(`${API_URL}/cards/companyCards/${name}`, {
          method: "GET",
          credentials: "include", // ✅ Cookies/session support
        });

        if (!response.ok) {
          throw new Error("Failed to fetch coupons");
        }

        const data = await response.json();
        setCoupons(data.data || []);
        console.log(data);
      } catch (error) {
        setError("Error fetching coupons");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [name]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        {name.toUpperCase()} Coupons
      </h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <p className="font-bold text-lg">Code: {coupon.code}</p>
              <p>Validity: {coupon.validity}</p>
              <p className="text-gray-500 text-sm">
                Created At: {new Date(coupon.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No Coupons Available</p>
        )}
      </div>
    </div>
  );
};

export default CompanyCoupons;
