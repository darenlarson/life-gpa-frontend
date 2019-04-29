import React from 'react';

const Habit = props => {
  return (
    <div>
      <h3>{props.habit.habit_name}</h3>
      <button onClick={() => props.completeHabit(props.habit)} >Done</button>
      <h4>30 Days: {props.habit.thirtyGPA}</h4>
      <h4>60 Days: {props.habit.sixtyGPA}</h4>
      <h4>90 Days: {props.habit.ninetyGPA}</h4>
    </div>
  )
}

export default Habit;