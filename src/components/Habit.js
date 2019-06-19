import React from "react";
import PropTypes from 'prop-types';
import "./css/Habit.css";

class Habit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  
  // Invoked when stats button clicked, which expands the habit to show GPA stats
  toggleVisibility = () => {
    // Stat element shown when this.state.show === true
    this.setState({ show: !this.state.show });
  };

  render() {
    // today and lastCompleted date variable, used to compare habit's last completed date (to render checkmark and button color)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastCompleted = new Date(this.props.habit.last_completed);

    return (
      <div className="habit-wrapper">
      {console.log(this.props)}
        <div className="btn-ctn">
          <button onClick={() => this.props.completeHabit(this.props.habit)} className={`status-btn ${lastCompleted - today === 0 ? "completed" : "noncompleted"}`}>Done</button>
        </div>
        <div className="habit-ctn">
          <div className="primary-info">
            <p className="name">{this.props.habit.habit_name} {lastCompleted - today === 0 && <span>&#10004;</span>}</p>
            <p className="stats-btn noselect" onClick={this.toggleVisibility}>stats...</p>
          </div>
          <div className={`more-info ${this.state.show ? "visible" : "hidden"}`} >
            <p className="GPA"><span className="gpa-label">30gpa:</span> {Math.round(this.props.habit.thirtyGPA * 100)}%</p>
            <p className="GPA"><span className="gpa-label">60GPA:</span> {Math.round(this.props.habit.sixtyGPA * 100)}%</p>
            <p className="GPA"><span className="gpa-label">90GPA:</span> {Math.round(this.props.habit.ninetyGPA * 100)}%</p>
          </div>
        </div>
      </div>
    );
  }
}

// Post.propTypes = {
//     post: PropTypes.shape({
//         username: PropTypes.string,
//         thumbnailURL: PropTypes.string,
//         imageURL: PropTypes.string,
//         likes: PropTypes.number,
//         timestamp: PropTypes.string,
//         comments: PropTypes.arrayOf(
//             PropTypes.shape({
//                 username: PropTypes.string,
//                 text: PropTypes.string
//             })
//         )
//     })
// }

Habit.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    habit_name: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    date_created: PropTypes.string.isRequired,
    last_completed: PropTypes.string.isRequired
  })
}

// {habit: {…}, completeHabit: ƒ}
// completeHabit: ƒ (habit)
// habit: {id: 44, habit_name: "Get up early", user_id: 1, date_created: "2019-06-06T05:00:00.000Z", last_completed: "2019-06-06T05:00:00.000Z", …}
// key: (...)
// get key: ƒ warnAboutAccessingKey()
// __proto__: Object

export default Habit;
