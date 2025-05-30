import { Button } from "@mui/base";
import { useNavigate } from "react-router-dom";
import "./style.css";

function AuthPanel() {
  const navigate = useNavigate();
  return (
    <div className="auth-controls-container1">
      <Button className="sign-in-button" onClick={() => navigate("/login")}>
        Увійти
      </Button>
      <Button className="signup-button" onClick={() => navigate("/signup")}>
        Рєстрація
      </Button>
    </div>
  );
}

export default AuthPanel;
