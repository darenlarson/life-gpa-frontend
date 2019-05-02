import React from "react";
import "./css/Habit.css";

class Habit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }

  toggleVisibility = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div className="habit-wrapper" onClick={this.toggleVisibility}>
        <div className="habit-ctn">
          <div className="primary-info">
            <button onClick={() => this.props.completeHabit(this.props.habit)}>Done</button>
            <p className="name">{this.props.habit.habit_name}</p>
          </div>
          <div className={`more-info ${this.state.show ? "visible" : "hidden"}`}>
            <p className="GPA">
              30 Days: {Math.round(this.props.habit.thirtyGPA * 100)}%
            </p>
            <p className="GPA">
              60 Days: {Math.round(this.props.habit.sixtyGPA * 100)}%
            </p>
            <p className="GPA">
              90 Days: {Math.round(this.props.habit.ninetyGPA * 100)}%
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Habit;
