// Footer component
import "./style.css";

function Footer() {
  return (
    <footer className="city-info-container">
      <p className="city-date-heading">Lutsk, 2025</p>
      <div className="city-info-container1">
        <div className="card-container">
          <span className="svg-container">{/* Facebook Icon */}</span>
        </div>
        <div className="card-container">
          <span className="svg-container">{/* LinkedIn Icon */}</span>
        </div>
        <div className="card-container">
          <span className="svg-container">{/* YouTube Icon */}</span>
        </div>
        <div className="card-container">
          <span className="svg-container">{/* Instagram Icon */}</span>
        </div>
      </div>
    </footer> 
  );
}

export default Footer;
