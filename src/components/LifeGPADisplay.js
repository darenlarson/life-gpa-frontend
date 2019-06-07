import React from "react";
import "./css/LifeGPADisplay.css";

const LifeGPADisplay = props => {
  return (
    <div className="lifeGPA-wrapper">
      <div className="lifeGPA-ctn">
        <h1>Your LifeGPA is <span>{Math.round(props.lifeGPA * 100)}%</span></h1>
      </div>
    </div>
  );
};

export default LifeGPADisplay;