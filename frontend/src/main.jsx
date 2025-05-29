import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ResetPassword from "./pages/ResetPassword";

import "./global.css"
import LibraryHub from "./components/LibraryHub";
import Footer from "./components/Footer";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("root element not found");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <div style={{ display: "inline-block", width: "100%", background: "#2d2c2a" }} data-ignore="used only for top most containter width">
      <LibraryHub />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
);
