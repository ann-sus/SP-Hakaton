import React from "react";
import ResetForm from "../components/ResetForm";

function ResetPassword() {
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 240px)" }}>
        <ResetForm />
      </div>
    </div>
  );
}

export default ResetPassword;



