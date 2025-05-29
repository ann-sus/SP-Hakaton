import React from "react";
import ComponentYouSelected from "../components/ComponentYouSelected";
import { mockData } from "../mockData";

function ProfilePage() {
  return (
    <div
      className="main-content-container"
      style={{
        minHeight: "100vh",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: 'url("/assets/background_profile.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
      }}
    >
      <ComponentYouSelected {...mockData} />
    </div>
  );
}

export default ProfilePage;
