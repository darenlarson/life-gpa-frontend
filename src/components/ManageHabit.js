import React from "react";
import './css/ManageHabit.css';

const ManageHabit = props => {
  return (
    <div className="manage-habit-wrapper">
      <div className="manage-habit-ctn">
        <div className="primary-info">
          <p className="name">{props.habit.habit_name}</p>
          <div className="manage-stats">
            {/* <p className="GPA">30 Days: {Math.round(props.habit.thirtyGPA * 100)}%</p> */}
            {/* <p className="GPA">60 Days: {Math.round(props.habit.sixtyGPA * 100)}%</p> */}
            {/* <p className="GPA">90 Days: {Math.round(props.habit.ninetyGPA * 100)}%</p> */}
          </div>
        </div>
        <div className="manage-options">
          <button className="manage-btn">ARCHIVE</button>
          <button className="manage-btn" onClick={() => props.resetData(props.habit)}>RESET</button>
          <button className="manage-btn" onClick={() => props.deleteHabit(props.habit)}>DELETE</button>
        </div>
      </div>
    </div>
  );
};

export default ManageHabit;
