import React from "react";
import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx"; 
import Layout from "./Layout.jsx";
import FrontPage from "./Pages/FrontPage.jsx";

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
        path: "mainPage", // 
        element: <FrontPage />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
);
