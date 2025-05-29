import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";
import MyBooksPage from "./pages/MyBooksPage";
import BookDescription from "./pages/BookDescription";

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
        <Route path="/" element={<WelcomePage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/books" element={<MyBooksPage />} />
        <Route
          path="/book/:id"
          element={
            <BookDescription
              book={{
                title: "Sample Book",
                author: "John Doe",
                coverUrl: "https://via.placeholder.com/150",
                summary: "This is a sample summary of the book. It provides an overview of the story, characters, and key themes. The book explores the journey of the protagonist through various challenges and adventures, making it a compelling read for fans of the genre.",
                genres: ["Fiction", "Adventure", "Mystery"]
              }}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
);
