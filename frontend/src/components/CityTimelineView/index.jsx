import SvgIcon1 from "./icons/SvgIcon1";
import SvgIcon2 from "./icons/SvgIcon2";
import SvgIcon3 from "./icons/SvgIcon3";
import SvgIcon4 from "./icons/SvgIcon4";
import "./style.css";

function CityTimelineView() {
  return (
    <div className="city-info-container">
      <p className="city-date-heading">Lutsk, 2025</p>
      <div className="city-info-container1">
        <div className="card-container">
          <SvgIcon1 className="svg-container" />
        </div>
        <div className="card-container">
          <SvgIcon2 className="svg-container" />
        </div>
        <div className="card-container">
          <SvgIcon3 className="svg-container" />
        </div>
        <div className="card-container">
          <SvgIcon4 className="svg-container" />
        </div>
      </div>
    </div>
  );
}

export default CityTimelineView;
