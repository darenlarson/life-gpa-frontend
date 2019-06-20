import React from 'react';
import PropTypes from 'prop-types';
import Habit from './Habit';
import './css/habitsList.css';

const HabitList = props => {
  return (
    <div>
      <p className={`${props.allCompleted === true ? "complete" : "incomplete"}`}>You're all done. Keep up the good work!</p>
      
      {props.habits.map(habit => (
        <Habit habit={habit} key={habit.id} completeHabit={props.completeHabit} />
      ))}

    </div>
  )
}

HabitList.propTypes = {
  habits: PropTypes.array.isRequired,
  completeHabit: PropTypes.func.isRequired,
  allCompleted: PropTypes.bool
}

export default HabitList;