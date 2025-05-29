import { Button } from "@mui/base";
import "./style.css";

function SignUpSection() {
  return (
    <div className="signup-button-container">
      <p className="sign-up-button-style">Sign up</p>
      {/* Button Component starts here. We've generated code using MUI Base. See other options in "Component library" dropdown in Settings */}
      <Button className="sign-in-button-style">Sign in</Button>
    </div>
  );
}

export default SignUpSection;
