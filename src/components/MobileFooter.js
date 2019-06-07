import React from "react";
import { NavLink } from "react-router-dom";
import "./css/MobileFooter.css";

const MobileFooter = props => {
  return (
    <div className="mobile-footer-wrapper">
      <NavLink
        to="/home"
        className={`mobile-nav-btn ${props.history.location.pathname ===
          "/home" && "selected"}`}
      >
        HOME
      </NavLink>
      <NavLink
        to="/home/manage-habits"
        className={`mobile-nav-btn ${props.history.location.pathname ===
          "/home/manage-habits" && "selected"}`}
      >
        MANAGE HABITS
      </NavLink>
    </div>
  );
};

export default MobileFooter;
