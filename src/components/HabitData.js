import React from "react";
import "../css/index.css";

class HabitData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      date_created,
      habit_name,
      habit_type,
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
        <div>
          {habit_type === "normal" && (
            <>
              <p>completions this week: {summary_data.completions_this_week}</p>
              <p>Streak: {summary_data.streak}</p>
            </>
          )}
          {habit_type === "number" && (
            <>
              <p>Goal: {number_goal}</p>
              <p>Start: {number_start_value} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {date_created}</p>
              <p>Last Entry: {last_value_added} &nbsp;&nbsp;&nbsp; {last_completed}</p>
              <p>Average Since Inception: {summary_data.inception_average}</p>
            </>
          )}
          {habit_type === "rating" && (
            <>
              <p>Goal: {ratings_goal}</p>
              <p>Last Entry: {last_value_added} &nbsp;&nbsp;&nbsp; {last_completed}</p>
              <p>Average Since Inception: {summary_data.inception_average}</p>
              <p>30 Day Average: {summary_data.thirty_day_average}</p>
              <p>7 Day Average: {summary_data.seven_day_average}</p>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default HabitData;
