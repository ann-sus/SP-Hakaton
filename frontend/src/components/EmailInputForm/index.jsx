import { Input } from "@mui/base";
import "./style.css";

function EmailInputForm() {
  return (
    <div className="email-section-container">
      <p className="email-header-text-style">Електронна пошта</p>
      {/* Input Component starts here. We've generated code using MUI Base. See other options in "Component library" dropdown in Settings */}
      <Input
        slotProps={{ root: { className: "email-input-container" }, input: { className: "email-input-style email-input-style::placeholder", placeholder: "email@janesfakedomain.net", type: "text" } }}
      />
    </div>
  );
}

export default EmailInputForm;
