import { Button } from "@mui/base";
import EmailInputForm from "../EmailInputForm";
import PasswordInputWidget from "../PasswordInputWidget";
import "./style.css";

function AuthFormWidget() {
  return (
    <div className="login-form-container2">
      <EmailInputForm />
      <PasswordInputWidget />
      {/* Button Component starts here. We've generated code using MUI Base. See other options in "Component library" dropdown in Settings */}
      <Button className="login-button-style">Увійти</Button>
    </div>
  );
}

export default AuthFormWidget;
