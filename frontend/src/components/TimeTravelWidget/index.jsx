import MultiSvgContainer from "../MultiSvgContainer";
import "./style.css";

function TimeTravelWidget() {
  return (
    <div className="city-info-container">
      <div className="header-divider" />
      <div className="city-info-container1">
        <p className="city-date-heading">Lutsk, 2025</p>
        <MultiSvgContainer />
      </div>
    </div>
  );
}

export default TimeTravelWidget;
