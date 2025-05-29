import { useState } from "react";
import "./style.css";

function LoginForm({ onSubmit }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ login, password });
    } else {
      // TODO: handle login logic
      alert(`Login: ${login}\nPassword: ${password}`);
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
      <button className="login-submit" type="submit">Увійти</button>
    </form>
  );
}

export default LoginForm;
