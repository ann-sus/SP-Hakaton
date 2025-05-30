import AuthPanel from "../AuthPanel";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LibraryHub() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideAuth = location.pathname === "/";
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuth") === "true";
    setIsAuth(auth);
  }, [location]);

  const handleLogout = async () => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    try {
      await fetch(`${process.env.REACT_APP_API_SERVER}/api/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access}`
        },
        body: JSON.stringify({ refresh })
      });
    } catch (e) {
      // optionally handle error
    }
    localStorage.setItem("isAuth", "false");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuth(false);
    navigate("/");
  };

  return (
    <div className="dark-theme-header-container">
      <Link
        to={isAuth ? "/books" : "/"}
        className="header-title"
        style={{ textDecoration: "none" }}
      >
        BOOKshelf
      </Link>
      <div className="auth-controls-container">
        {!hideAuth && (
          isAuth ? (
            <>
              <Link to="/profile" className="sign-in-button" style={{ textDecoration: "none", display: "block", textAlign: "center", lineHeight: "52px" }}>
                Profile
              </Link>
              <button className="sign-in-button" style={{ marginLeft: 12 }} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <AuthPanel />
          )
        )}
      </div>
    </div>
  );
}

export default LibraryHub;
