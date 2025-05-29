import React from "react";
import SignUpForm from "../components/SignUpForm";

function SignUpPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: 'url("/assets/background_profile.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        overflowY: "auto",
      }}
    >
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
