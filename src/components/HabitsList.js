import React from 'react';
import Habit from './Habit';
import './css/habitsList.css';

const HabitList = props => {
  return (
    <div>
      <p className={`${props.allCompleted === true ? "complete" : "incomplete"}`}>You're all done. Keep up the good work!</p>
      {props.habits.map(habit => (
        <Habit key={habit.id} habit={habit} completeHabit={props.completeHabit} />
      ))}
    </div>
  )
}

export default HabitList;