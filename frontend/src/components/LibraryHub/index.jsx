import AuthPanel from "../AuthPanel";
import "./style.css";

function LibraryHub() {
  return (
    <div className="dark-theme-header-container">
      <p className="header-title">BOOKshelf</p>
      <div className="auth-controls-container">
        <AuthPanel />
      </div>
    </div>
  );
}

export default LibraryHub;
