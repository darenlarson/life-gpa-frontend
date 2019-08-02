import React from "react";
import PropTypes from 'prop-types';
// import "./css/Habit.css";
import '../css/index.css';

class Habit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      rating: '',
      count: 0,
      number: '',
    };
  }

  // Handler for setting on state from forms
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  countChange = (event, direction) => {
    event.preventDefault();

    if (direction === "increment") {
      this.setState({ count: this.state.count + 1 })
    } else {
      if (this.state.count > 1) {
        this.setState({ count: this.state.count - 1})
      } else {
        this.setState({ count: 0 })
      }
    }

    this.submitHabitData(event);
  }

  submitHabitData = event => {
    event.preventDefault();
    const { habit_type } = this.props.habit;

    const habitInfo = {
      ...this.props.habit,
      rating: habit_type === 'rating' ? this.state.rating : null,
      count: habit_type === 'count' ? this.state.count : null,
      number: habit_type === 'number' ? this.state.number : null,
    }
    this.props.completeHabit(habitInfo)
  }

  dateDiff() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastCompleted = new Date(this.props.habit.last_completed);

    return lastCompleted - today;
  }



  render() {
    return (
      <div className="habit-wrapper">
        <div className="habit-ctn">
          <div className="primary-info">
            <p className="name">{this.props.habit.habit_name}</p>
          </div>
        </div>

        <form className="response-ctn" onSubmit={this.submitHabitData}>
          {this.props.habit.habit_type === "normal" && <div className="btn-ctn"><button className={`status-btn ${this.dateDiff() === 0 ? "completed" : "noncompleted"}`}>Done</button></div>}

          {this.props.habit.habit_type === "rating" && <div className="rating-form-ctn"><input type="text" name="rating" onChange={this.handleChange} value={this.state.rating} placeholder="rating" /></div>}

          {this.props.habit.habit_type === "count" && <div className="count-form-ctn">
            <button className="decrement-count" onClick={(event) => this.countChange(event, "decrement")}>-</button>
            <div>{this.state.count}</div>
            <button className="increment-count" onClick={(event) => this.countChange(event, "increment")}>+</button>
          </div>}

          {this.props.habit.habit_type === "number" && <div className="number-form-ctn"><input type="text" name="number" onChange={this.handleChange} value={this.state.number} placeholder="Add a #" /></div>}
        </form>

      </div>
    );
  }
}

Habit.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    habit_name: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    date_created: PropTypes.string.isRequired,
    last_completed: PropTypes.string.isRequired
  }),
  completeHabit: PropTypes.func.isRequired,
}

export default Habit;