import React, { useState } from "react";
import "./style.css";

function SignUpForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }
    // Тут можна додати логіку відправки даних на сервер
    alert("Реєстрація успішна!");
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label htmlFor="signup-firstname" className="signup-label">Ім'я</label>
      <input
        id="signup-firstname"
        className="signup-input"
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        placeholder="Введіть ім'я"
        required
        autoComplete="given-name"
      />
      <label htmlFor="signup-lastname" className="signup-label">Прізвище</label>
      <input
        id="signup-lastname"
        className="signup-input"
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Введіть прізвище"
        required
        autoComplete="family-name"
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
