import React, { useState } from "react";
import "./style.css";

const ChangePasswordForm = ({ onChangePassword }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }
    const token = localStorage.getItem("access");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/change-password/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword
        })
      });
      if (response.ok) {
        setMessage("Пароль успішно змінено");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await response.json();
        if (data.new_password && Array.isArray(data.new_password)) {
          setError(data.new_password.join(" "));
        } else if (data.old_password) {
          setError(data.old_password);
        } else if (data.error) {
          setError(data.error);
        } else {
          setError("Не вдалося змінити пароль");
        }
      }
    } catch (err) {
      setError("Помилка з'єднання з сервером");
    }
  };

  return (
    <form className="change-password-form" onSubmit={handleSubmit}>
      <h3>Змінити пароль</h3>
      <div>
        <label>Старий пароль:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Новий пароль:</label>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Підтвердіть новий пароль:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Змінити</button>
      {error && <div className="change-password-message" style={{color: 'red'}}>{error}</div>}
      {message && <div className="change-password-message" style={{color: 'green'}}>{message}</div>}
    </form>
  );
};

export default ChangePasswordForm;
