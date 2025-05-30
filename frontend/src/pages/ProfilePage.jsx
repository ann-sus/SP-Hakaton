
import React from "react";
import ProfileInfo from "../components/ProfileInfo";
import ChangePasswordForm from "../components/ChangePasswordForm";




import { useEffect, useState } from "react";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/auth/profile/`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setError("Не вдалося отримати профіль користувача");
        }
      } catch (err) {
        setError("Помилка з'єднання з сервером");
      }
    };
    fetchProfile();
  }, []);

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
      {error && <div style={{color: "red", marginBottom: 16}}>{error}</div>}
      {profile && <ProfileInfo {...profile} />}
      <ChangePasswordForm />
    </div>
  );
}

export default ProfilePage;
