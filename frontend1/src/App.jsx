import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import CompanyCoupons from "./Pages/CompanyCoupan.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/company/:name" element={<CompanyCoupons />} />
    </Routes>
  );
};

export default App;
