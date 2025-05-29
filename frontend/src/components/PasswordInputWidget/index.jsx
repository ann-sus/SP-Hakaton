import { Input } from "@mui/base";
import "./style.css";

function PasswordInputWidget() {
  return (
    <div className="email-section-container">
      <p className="email-header-text-style">Пароль</p>
      {/* Input Component starts here. We've generated code using MUI Base. See other options in "Component library" dropdown in Settings */}
      <Input slotProps={{ root: { className: "email-input-container" }, input: { className: "email-input-style email-input-style::placeholder", placeholder: "**************", type: "text" } }} />
    </div>
  );
}

export default PasswordInputWidget;
