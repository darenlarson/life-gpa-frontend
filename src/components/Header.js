import React from 'react';
import './css/Header.css';

const Header = () => {
  return (
    <header>
      <div className="header-ctn">
        <div className="logo">
          <h2>LifeGPA</h2>
        </div>

        <nav>
          <div>
            <button>MANAGE HABITS</button>
            <button>STATISTICS</button>
            <button>SETTINGS</button>
            <button>LOGOUT</button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header;