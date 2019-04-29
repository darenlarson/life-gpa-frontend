import React from 'react';
import Habit from './Habit';

const HabitList = props => {
  return (
    <div>
      {props.habits.map(habit => (
        <Habit key={habit.id} habit={habit} completeHabit={props.completeHabit} />
      ))}
    </div>
  )
}

export default HabitList;