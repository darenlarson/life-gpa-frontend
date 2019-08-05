import React from "react";
import '../css/index.css';

class HabitData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { habit_name, records } = this.props
    console.log(records);
    return (
      <div className="data-ctn">
        <h4>{habit_name}</h4>
        {records.map(record => (
          <div>{record.habit_name}</div>
        ))}
      </div>
    )
  }
}

export default HabitData;
