import React from "react";
import MyBooksList from "../components/MyBooksList";

function MyBooksPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("/assets/background_profile.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        overflowY: "auto"
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "calc(100vh - 240px)", paddingTop: 120 }}>
        <MyBooksList />
      </div>
    </div>
  );
}

export default MyBooksPage;
