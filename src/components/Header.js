import React from 'react';
import { NavLink } from "react-router-dom";
import './css/Header.css';

const Header = props => {
  const loggedIn = localStorage.getItem('token') ? true : false;
  return (
    <header className="header-wrapper">
      <div className="header-ctn">
        <div className="logo-wrapper">
          <NavLink to="/home" className="logo"><h2>LifeGPA</h2></NavLink>
        </div>

        <nav>
          <div>
            {loggedIn === true && <NavLink to="/home" className={`nav-btn hide ${props.history.location.pathname === "/home" && "selected"}`}>HOME</NavLink>}
            {loggedIn === true &&  <NavLink to="/home/manage-habits" className={`nav-btn hide ${props.history.location.pathname === "/home/manage-habits" && "selected"}`}>MANAGE HABITS</NavLink>}
            <button className="nav-btn" onClick={(event) => props.logoutUser(event)}>LOGOUT</button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header;