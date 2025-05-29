// LoginPage.jsx
import React from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/profile");
  };
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
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}

export default LoginPage;
