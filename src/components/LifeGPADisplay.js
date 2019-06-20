import React from "react";
import PropTypes from 'prop-types';
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

LifeGPADisplay.propTypes = {
  lifeGPA: PropTypes.number.isRequired
}

export default LifeGPADisplay;