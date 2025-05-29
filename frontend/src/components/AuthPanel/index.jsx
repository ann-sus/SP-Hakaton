import { Button } from "@mui/base";
import { useNavigate } from "react-router-dom";
import "./style.css";

function AuthPanel() {
  const navigate = useNavigate();
  return (
    <div className="auth-controls-container1">
      <Button className="sign-in-button" onClick={() => navigate("/login")}>
        Sign in
      </Button>
      <Button className="signup-button" onClick={() => navigate("/signup")}>
        Sign up
      </Button>
    </div>
  );
}

export default AuthPanel;
