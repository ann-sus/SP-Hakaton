import React from "react";
import "./style.css";

const ProfileInfo = ({ id, username, email }) => (
  <div className="profile-info">
    <h2>Профіль користувача</h2>
    <div className="profile-info-row"><span>Ідентифікатор аккаунту:</span> <span>{id}</span></div>
    <div className="profile-info-row"><span>Ім'я користувача:</span> <span>{username}</span></div>
    <div className="profile-info-row"><span>Email:</span> <span>{email}</span></div>
  </div>
);

export default ProfileInfo;
