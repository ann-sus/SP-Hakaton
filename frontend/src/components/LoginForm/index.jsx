import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";



function LoginForm({ onSubmit }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("${process.env.REACT_APP_API_SERVER}/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: login,
          password: password
        })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("isAuth", "true");
        if (onSubmit) {
          onSubmit({ login, password });
        }
      } else {
        const err = await response.json();
        setError(err.detail || "Невірний логін або пароль");
        localStorage.setItem("isAuth", "false");
      }
    } catch (e) {
      setError("Помилка з'єднання з сервером");
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
          style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", font: "500 16px Inter, sans-serif", padding: 0 }}
          onClick={() => navigate("/reset-password")}
        >
          Забули пароль?
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
