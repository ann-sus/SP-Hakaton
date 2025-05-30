import { useState } from "react";
import "./style.css";

function ResetForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Введіть коректний e-mail!");
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/auth/password/reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) {
        setSent(true);
      } else {
        setError(data.error || "Не вдалося надіслати інструкцію");
      }
    } catch (e) {
      setError("Помилка з'єднання з сервером");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-title" style={{ color: '#fff', textAlign: 'center', marginBottom: 8 }}>Скидання паролю</h2>
      <p className="login-description" style={{ color: '#fff', textAlign: 'center', marginBottom: 16, fontSize: 16 }}>
        Введіть e-mail, на який буде надіслано інструкцію для скидання паролю.
      </p>
      <label htmlFor="email-input" className="login-label">E-mail</label>
      <input
        id="email-input"
        className="login-input"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Введіть e-mail"
        autoComplete="email"
        disabled={sent}
      />
      <button className="login-submit" type="submit" disabled={sent}>
        {sent ? "Інструкція надіслана" : "Скинути пароль"}
      </button>
      <button
        className="login-submit back-btn"
        style={{ background: '#000000', color: '#fff', marginTop: 0 }}
        onClick={() => window.location.href = "/login"}
        type="button"
      >
        Повернутись до входу
      </button>
      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginTop: 16 }}>{error}</div>
      )}
      {sent && (
        <div style={{ color: '#90ee90', textAlign: 'center', marginTop: 16 }}>
          Інструкція для скидання паролю відправлена на: <b>{email}</b>
        </div>
      )}
    </form>
  );
}

export default ResetForm;
