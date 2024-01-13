import React from "react";
// import "../../styles/header.css";
import "../../styles/global.css";

function Head() {
  return (
    <footer className="footer-container">
      <div className="header" style={{ justifyContent: "flex-start" }}>
        <div className="header-2" style={{ width: "max-content" }}>
          <a href="/aboutus">About us</a>
        </div>
        <div className="header-2" style={{ width: "max-content" }}>
          Privacy policy
        </div>
        <div className="header-2" style={{ width: "max-content" }}>
          Terms of Service
        </div>
      </div>
    </footer>
  );
}

export default Head;
