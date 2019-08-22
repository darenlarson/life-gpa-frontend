import React from "react";
import HabitData from "./HabitData";

const HabitsDataList = props => {
  // console.log(props);
  return (
    <div>
      {props.habits.map(habit => (
        <HabitData
          key={habit.id}
          id={habit.id}
          count_goal={habit.count_goal}
          date_created={habit.date_created.slice(0, 10)}
          days_per_week_goal={habit.days_per_week_goal}
          habit_name={habit.habit_name}
          habit_type={habit.habit_type}
          last_completed={habit.last_completed.slice(0, 10)}
          last_value_added={habit.last_value_added}
          number_goal={habit.number_goal}
          number_start_value={habit.records[0].number}
          ratings_goal={habit.ratings_goal}
          summary_data={habit.summary_data}
        />
      ))}
    </div>
  )
}

export default HabitsDataList;