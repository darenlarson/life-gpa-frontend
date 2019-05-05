import React from "react";
import "./css/Habit.css";

class Habit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  toggleVisibility = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastCompleted = new Date(this.props.habit.last_completed);

    return (
      <div className="habit-wrapper">
        <div className="btn-ctn">
          <button onClick={() => this.props.completeHabit(this.props.habit)} className={`status-btn ${lastCompleted - today === 0 ? "completed" : "noncompleted"}`}>Done</button>
        </div>
        
        <div className="habit-ctn">

          <div className="primary-info">
            <p className="name">{this.props.habit.habit_name} {lastCompleted - today === 0 && <span>&#10004;</span>}</p>
            <p className="stats-btn" onClick={this.toggleVisibility}>stats...</p>
          </div>

          <div className={`more-info ${this.state.show ? "visible" : "hidden"}`} >
            <p className="GPA">30GPA: {Math.round(this.props.habit.thirtyGPA * 100)}%</p>
            <p className="GPA">60GPA: {Math.round(this.props.habit.sixtyGPA * 100)}%</p>
            <p className="GPA">90GPA: {Math.round(this.props.habit.ninetyGPA * 100)}%</p>
          </div>

        </div>

      </div>
    );
  }
}

export default Habit;
