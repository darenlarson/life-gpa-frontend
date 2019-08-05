import React from "react";
import HabitData from "./HabitData";

const HabitsDataList = props => {
  console.log(props);
  return (
    <div>
      {props.habits.map(habit => (
        <HabitData
          key={habit.id}
          habit_name={habit.habit_name}
          records={habit.records}
        />
      ))}
    </div>
  )
}

export default HabitsDataList;