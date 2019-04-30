import React from "react";
import "./css/Habit.css";

const Habit = props => {
  return (
    <div className="habit-wrapper">
      <div className="habit-ctn">
        <button onClick={() => props.completeHabit(props.habit)}>Done</button>
        <p className="name">{props.habit.habit_name}</p>
        <p className="GPA">30 Days: {props.habit.thirtyGPA * 100}%</p>
        <p className="GPA">60 Days: {props.habit.sixtyGPA * 100}%</p>
        <p className="GPA">90 Days: {props.habit.ninetyGPA * 100}%</p>
      </div>
    </div>
  );
};

export default Habit;
