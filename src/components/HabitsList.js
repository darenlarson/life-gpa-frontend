import React from "react";
import PropTypes from "prop-types";
import Habit from "./Habit";
import "../css/index.css";

const HabitList = props => {
  console.log(props);
  // const sortedHabits = props.habits.sort((a, b) =>  new Date(a.last_completed) - new Date(b.last_completed));

  return (
    <>
      {/* <p className={`${props.allCompleted === true ? "complete" : "incomplete"}`} >You're all done. Keep up the good work!</p> */}

      {props.habits.map(habit => (
        <Habit habit={habit} key={habit.id} completeHabit={props.completeHabit} />
      ))}
    </>
  );
};

HabitList.propTypes = {
  habits: PropTypes.array.isRequired,
  completeHabit: PropTypes.func.isRequired,
  allCompleted: PropTypes.bool
};

export default HabitList;
