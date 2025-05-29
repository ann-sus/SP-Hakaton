import FieldLabelRenderer from "../FieldLabelRenderer";
import "./style.css";

function ProfileSection({ dynamicFieldLabels }) {
  return (
    <div className="profile-card-container">
      <div className="profile-card">
        <div className="vertical-centered-container">
          <div className="vertical-centered-text-container">
            <p className="mega-heading">A</p>
          </div>
        </div>
      </div>
      <div className="profile-container">
        <p className="profile-title">Profile</p>
        <FieldLabelRenderer dynamicFieldLabels={dynamicFieldLabels} />
      </div>
    </div>
  );
}

export default ProfileSection;
