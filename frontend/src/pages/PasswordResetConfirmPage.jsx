import React, { useState } from "react";

function PasswordResetConfirmPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Отримуємо uid і token з URL
  const params = new URLSearchParams(window.location.search);
  const uid = params.get("uid");
  const token = params.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!password || password.length < 8) {
      setError("Пароль має містити мінімум 8 символів");
      return;
    }
    if (password !== confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/auth/password/reset/confirm/?uid=${uid}&token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_password: password })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Не вдалося скинути пароль");
      }
    } catch (e) {
      setError("Помилка з'єднання з сервером");
    }
  };

  if (success) {
    return (
      <div style={{ maxWidth: 400, margin: "120px auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.10)", padding: 36, textAlign: "center" }}>
        <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Пароль успішно змінено!</h2>
        <a href="/login" style={{ color: '#fff', background: '#1976d2', padding: '10px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 18 }}>Увійти</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "120px auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.10)", padding: 36 }}>
      <h2 style={{ color: '#1976d2', textAlign: 'center', marginBottom: 16 }}>Встановіть новий пароль</h2>
      <label style={{ display: 'block', marginBottom: 8 }}>Новий пароль</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Введіть новий пароль"
        style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 8, border: '1px solid #ccc' }}
        required
      />
      <label style={{ display: 'block', marginBottom: 8 }}>Підтвердіть новий пароль</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder="Підтвердіть новий пароль"
        style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 8, border: '1px solid #ccc' }}
        required
      />
      {error && <div style={{ color: 'red', marginBottom: 16, textAlign: 'center' }}>{error}</div>}
      <button type="submit" style={{ width: '100%', padding: '12px 0', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 18 }}>Змінити пароль</button>
    </form>
  );
}

export default PasswordResetConfirmPage;
