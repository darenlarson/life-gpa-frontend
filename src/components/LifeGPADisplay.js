import React from "react";
import "./css/LifeGPADisplay.css";

const LifeGPADisplay = props => {
  return (
    <div className="lifeGPA-wrapper">
      <div className="lifeGPA-ctn">
        <h3>{props.lifeGPA * 100}%</h3>
      </div>
    </div>
  );
};

export default LifeGPADisplay;
