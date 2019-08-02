import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { logoutUser } from '../store/actions';
// import "./css/Header.css";
import '../css/index.css';

const Header = props => {
  // If loggedIn is true, won't render the HOME and MANAGE HABITS buttons
  const loggedIn = localStorage.getItem("token") ? true : false;

  return (
    <header className="header-wrapper">
      <div className="header-ctn">
        <div className="logo-wrapper">
          <NavLink to="/home" className="logo">
            <h2>LifeGPA</h2>
          </NavLink>
        </div>
        <nav>
          <div>
            {loggedIn === true && (
              <>
                <NavLink
                  to="/habits/home"
                  className={`nav-btn hide ${props.history.location.pathname ===
                    "/habits/home" && "selected"}`}
                >
                  TODAY
                </NavLink>
                <NavLink
                  to="/habits/home/manage-habits"
                  className={`nav-btn hide ${props.history.location.pathname ===
                    "/habits/home/manage-habits" && "selected"}`}
                >
                  MANAGE HABITS
                </NavLink>
                <button
                  className="nav-btn"
                  onClick={event => props.logoutUser(props.history)}
                >
                  LOGOUT
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default connect(null, { logoutUser })(Header);
