import { Input } from "@mui/base";
import "./style.css";

function PasswordChangeForm() {
  return (
    <div className="password-change-form-container2">
      <div className="password-change-form-container1">
        <div className="password-change-form-container">
          <label htmlFor="change password" className="password-change-heading" style={{ color: '#fff' }}>
            Змінити пароль
          </label>
        </div>
        <Input
          slotProps={{
            root: { className: "password-change-input-container" },
            input: { className: "password-input-field password-input-field::placeholder", placeholder: "Current password", type: "text", style: { color: '#fff', background: '#000000' } },
          }}
        />
        <Input
          slotProps={{
            root: { className: "password-change-input-container" },
            input: { className: "password-input-field password-input-field::placeholder", placeholder: "New password", type: "text", style: { color: '#fff', background: '#000000' } },
          }}
        />
        <Input
          slotProps={{
            root: { className: "password-change-input-container" },
            input: { className: "password-input-field password-input-field::placeholder", placeholder: "Confirm password", type: "text", style: { color: '#fff', background: '#000000' } },
          }}
        />
      </div>
    </div>
  );
}

export default PasswordChangeForm;
