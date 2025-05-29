import { Button } from "@mui/base";
import PasswordChangeForm from "../PasswordChangeForm";
import "./style.css";

function SecurePasswordManager() {
  return (
    <div className="password-change-form-container3">
      <PasswordChangeForm />
      {/* Button Component starts here. We've generated code using MUI Base. See other options in "Component library" dropdown in Settings */}
      <Button className="change-password-button">Change Password</Button>
      {/* Button Component starts here. We've generated code using MUI Base. See other options in "Component library" dropdown in Settings */}
      <Button className="success-message-container">Password changed successfully</Button>
    </div>
  );
}

export default SecurePasswordManager;
