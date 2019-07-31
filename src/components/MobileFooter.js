import React from "react";
import { NavLink } from "react-router-dom";
// import "./css/MobileFooter.css";
import '../css/index.css';

const MobileFooter = props => {
  return (
    <div className="mobile-footer-wrapper">
      <NavLink
        to="/habits/home"
        className={`mobile-nav-btn ${props.history.location.pathname ===
          "/habits/home" && "selected"}`}
      >
        HOME
      </NavLink>
      <NavLink
        to="/habits/home/manage-habits"
        className={`mobile-nav-btn ${props.history.location.pathname ===
          "/habits/home/manage-habits" && "selected"}`}
      >
        MANAGE HABITS
      </NavLink>
    </div>
  );
};

export default MobileFooter;
