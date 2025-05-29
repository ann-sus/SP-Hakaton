import SvgIcon1 from "./icons/SvgIcon1";
import SvgIcon2 from "./icons/SvgIcon2";
import SvgIcon3 from "./icons/SvgIcon3";
import SvgIcon4 from "./icons/SvgIcon4";
import "./style.css";

function MultiSvgContainer() {
  return (
    <div className="flex-container-with-sv-gs">
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
  );
}

export default MultiSvgContainer;
