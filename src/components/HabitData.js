import React from "react";
import "../css/index.css";

class HabitData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { habit_name, habit_type, records, summaryData } = this.props;
    console.log(this.props);
    return (
      <div className="data-ctn">
        <h4>{habit_name}</h4>
        {habit_type === "normal" && (
          <div>
            <p>completions this week: {summaryData.completions_this_week}</p>
            <p>Streak: {summaryData.streak}</p>
          </div>
        )}
      </div>
    );
  }
}

export default HabitData;
