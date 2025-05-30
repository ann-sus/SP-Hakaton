import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withTokenRefresh } from "./utils/withTokenRefresh";

import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ResetPassword from "./pages/ResetPassword";
import WelcomePage from "./pages/WelcomePage";
import MyBooksPage from "./pages/MyBooksPage";
import BookDescription from "./pages/BookDescription";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import PasswordResetConfirmPage from "./pages/PasswordResetConfirmPage";

import "./global.css"
import LibraryHub from "./components/LibraryHub";
import Footer from "./components/Footer";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("root element not found");
const root = createRoot(rootElement);

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "inline-block", width: "100%", background: "#2d2c2a" }} data-ignore="used only for top most containter width">
        <LibraryHub />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<WelcomePage />} />
          <Route path="/books" element={<MyBooksPage />} />
          <Route path="/books/:id" element={<BookDescription />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/reset-password/confirm" element={<PasswordResetConfirmPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const AppWithTokenRefresh = withTokenRefresh(App);

root.render(<AppWithTokenRefresh />);
