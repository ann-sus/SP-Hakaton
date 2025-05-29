import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

// Тестовий словник логінів і паролів
const USERS = {
  "user1": "password1",
  "user2": "password2"
};

function LoginForm({ onSubmit }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (USERS[login] && USERS[login] === password) {
      localStorage.setItem("isAuth", "true");
      setError("");
      if (onSubmit) {
        onSubmit({ login, password });
      }
    } else {
      setError("Невірний логін або пароль");
      localStorage.setItem("isAuth", "false");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="login-input" className="login-label">Логін</label>
      <input
        id="login-input"
        className="login-input"
        type="text"
        value={login}
        onChange={e => setLogin(e.target.value)}
        placeholder="Введіть логін"
        autoComplete="username"
      />
      <label htmlFor="password-input" className="login-label">Пароль</label>
      <input
        id="password-input"
        className="login-input"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Введіть пароль"
        autoComplete="current-password"
      />
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <button className="login-submit" type="submit">Увійти</button>
      <div style={{ textAlign: "right", marginTop: 8 }}>
        <button
          type="button"
          style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer", font: "500 16px Inter, sans-serif", padding: 0 }}
          onClick={() => navigate("/reset-password")}
        >
          Забули пароль?
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
