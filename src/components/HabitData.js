import React from "react";
import { NavLink } from "react-router-dom";
import "../css/index.css";

class HabitData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      count_goal,
      date_created,
      days_per_week_goal,
      habit_name,
      habit_type,
      id,
      last_completed,
      last_value_added,
      number_goal,
      number_start_value,
      ratings_goal,
      summary_data
    } = this.props;

    return (
      <div className="data-ctn">
        <h4>{habit_name}</h4>
        <NavLink to={`/habits/home/habit-data/${id}`}><p>more info...</p></NavLink>
        <div>
          {habit_type === "normal" && (
            <>
              <p>completions this week: {summary_data.completions_this_week}</p>
              <p>Current Streak: {summary_data.streak}</p>
              <p>Weekly Goal Progression: {summary_data.completions_this_week}/{days_per_week_goal}</p>
              <p>Best Streak: {summary_data.longest_streak}</p>
            </>
          )}
          {habit_type === "number" && (
            <>
              <p>Goal: {number_goal}</p>
              <p>Start: {number_start_value} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {date_created}</p>
              <p>Last Entry: {last_value_added} &nbsp;&nbsp;&nbsp; {last_completed}</p>
              <p>Average Since Inception: {summary_data.inception_average.toFixed(2)}</p>
            </>
          )}
          {habit_type === "rating" && (
            <>
              <p>Goal: {ratings_goal}</p>
              <p>Last Entry: {last_value_added} &nbsp;&nbsp;&nbsp; {last_completed}</p>
              <p>Average Since Inception: {summary_data.inception_average.toFixed(2)}</p>
              <p>30 Day Average: {summary_data.thirty_day_average.toFixed(2)}</p>
              <p>7 Day Average: {summary_data.seven_day_average.toFixed(2)}</p>
            </>
          )}
          {habit_type === "count" && (
            <>
              <p>Goal: {count_goal}</p>
              <p>Last Entry: {last_value_added} &nbsp;&nbsp;&nbsp; {last_completed}</p>
              <p>Average Since Inception: {summary_data.inception_average.toFixed(2)}</p>
              <p>30 Day Average: {summary_data.thirty_day_average.toFixed(2)}</p>
              <p>7 Day Average: {summary_data.seven_day_average.toFixed(2)}</p>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default HabitData;
