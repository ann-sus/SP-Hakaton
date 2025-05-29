import ProfileSection from "../ProfileSection";
import SecurePasswordManager from "../SecurePasswordManager";
import "./style.css";

function ComponentYouSelected({ dynamicFieldLabels }) {
  return (
    <div className="profile-section-container1">
      <div className="profile-section-container">
        <ProfileSection dynamicFieldLabels={dynamicFieldLabels} />
        <SecurePasswordManager />
      </div>
    </div>
  );
}

export default ComponentYouSelected;
