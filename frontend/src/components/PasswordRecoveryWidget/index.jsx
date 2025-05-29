import AuthFormWidget from "../AuthFormWidget";
import "./style.css";

function PasswordRecoveryWidget() {
  return (
    <div className="login-form-container">
      <AuthFormWidget />
      <p className="forgot-password-link-text-style">Забули пароль?</p>
    </div>
  );
}

export default PasswordRecoveryWidget;
