import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Coupon from "./Pages/CompanyCoupan.jsx"; // ✅ Correct import
import Signup from "./Pages/Signup.jsx"; 
import Layout from "./Layout.jsx";
import AvailCard from "./Pages/availCard.jsx";
import FrontPage from "./Pages/FrontPage.jsx";
import UploadCard from "./Pages/UploadCard.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/layout",
    element: <Layout />,
    children: [
      {
        path: "", 
        element: <FrontPage />
      },
      {
        path: "company/:name",  // ✅ Relative path use kiya (Corrected)
        element: <Coupon />
      },
      {
        path: "availCoupan/:decryptedData",
        element: <AvailCard />
        ///layout/availCoupan/${decryptedData}`
      },
      {
        path: "uploadcard",
        element: <UploadCard />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
);
