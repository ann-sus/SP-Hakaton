import React from "react";
import WelcomeBox from "../components/WelcomeBox";

function WelcomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: 'url("/assets/background_profile.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <WelcomeBox />
    </div>
  );
}

export default WelcomePage;
