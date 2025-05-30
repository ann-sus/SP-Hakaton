import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function SignUpForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert("Реєстрація успішна!");
        setForm({ username: "", email: "", password: "", confirmPassword: "" });
        navigate("/login");
      } else {
        setError(data.error || "Сталася помилка при реєстрації");
      }
    } catch (err) {
      setError("Помилка з'єднання з сервером");
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label htmlFor="signup-username" className="signup-label">Ім'я користувача</label>
      <input
        id="signup-username"
        className="signup-input"
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Введіть ім'я користувача"
        required
        autoComplete="username"
      />
      <label htmlFor="signup-email" className="signup-label">Email</label>
      <input
        id="signup-email"
        className="signup-input"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Введіть email"
        required
        autoComplete="email"
      />
      <label htmlFor="signup-password" className="signup-label">Пароль</label>
      <input
        id="signup-password"
        className="signup-input"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Введіть пароль"
        required
        autoComplete="new-password"
      />
      <label htmlFor="signup-confirm-password" className="signup-label">Підтвердіть пароль</label>
      <input
        id="signup-confirm-password"
        className="signup-input"
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="Підтвердіть пароль"
        required
        autoComplete="new-password"
      />
      {error && (
        <div style={{ color: "red", marginBottom: "8px", marginTop: "-8px" }}>{error}</div>
      )}
      <button className="signup-submit" type="submit">Зареєструватися</button>
    </form>
  );
}

export default SignUpForm;
