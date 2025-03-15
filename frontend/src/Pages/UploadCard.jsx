import React, { useState } from "react";
import { API_URL } from "../constant.js";
import { useNavigate } from "react-router-dom";

const UploadCard = () => {
  const [company, setCompany] = useState("");
  const [code, setCode] = useState("");
  const [validity, setValidity] = useState("");
  const [description, setDescription] = useState("");

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
        body: form, // ✅ Sending FormData
      });

      const result = await res.json();
      if (result.success) {
        setCompany("");
        setCode("");
        setValidity("");
        setDescription("");
        navigate("/layout"); // ✅ Redirect on success
      } else {
        alert("Failed to add coupon ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Coupon</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company Name"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon Code"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="validity"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          placeholder="Validity (e.g., 1d)"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadCard;
