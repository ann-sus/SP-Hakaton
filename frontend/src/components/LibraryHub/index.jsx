import AuthPanel from "../AuthPanel";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

function LibraryHub() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideAuth = location.pathname === "/";
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuth") === "true";
    setIsAuth(auth);
  }, [location]);

  useEffect(() => {
    const checkAdmin = async () => {
      const access = localStorage.getItem("access");
      if (!access) {
        setIsAdmin(false);
        return;
      }
      try {
        const res = await fetchWithAuth(`${import.meta.env.VITE_API_SERVER}/api/auth/profile/`, {
          headers: { "Authorization": `Bearer ${access}` }
        });
        if (res.ok) {
          const data = await res.json();
          setIsAdmin(!!data.is_staff);
        } else {
          setIsAdmin(false);
        }
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [isAuth]);

  const handleLogout = async () => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    try {
      await fetch(`${import.meta.env.VITE_API_SERVER}/api/auth/logout/`, {
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
              {isAdmin && (
                <button className="sign-in-button" onClick={() => navigate("/admin")}>Адмін-панель</button>
              )}
              <Link to="/profile" className="sign-in-button" style={{ textDecoration: "none", display: "block", textAlign: "center", lineHeight: "52px" }}>
                Profile
              </Link>
              <button className="sign-in-button" onClick={handleLogout}>
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
