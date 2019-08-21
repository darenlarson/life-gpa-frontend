import React from "react";
import PropTypes from 'prop-types';
import '../css/index.css';

class Habit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      count: 0,
      number: '',
    };
  }

  componentDidMount() {
    if (this.dateDiff() === 0) {
      this.setState({ count: this.props.habit.last_value_added });
    }
  }

  // Handler for setting on state from forms
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  countChange = (event, direction) => {
    if (direction === "increment") {
      this.setState(prevState => {
        return { count: prevState.count + 1 }
      }, () => this.submitHabitData(event))
    } else {
      if (this.state.count > 1) {
        this.setState(prevState => {
          return { count: prevState.count - 1}
        }, () => this.submitHabitData(event))
      } else {
        this.setState(prevState => {
          return { count: 0 }
        }, () => this.submitHabitData(event))
      }
    }
  }

  submitHabitData = event => {
    event.preventDefault();
    const { habit_type } = this.props.habit;

    let last_value_added;

    if (habit_type === 'rating') {
      last_value_added = this.state.rating;
    } else if (habit_type === 'count') {
      last_value_added = this.state.count;
    } else {
      last_value_added = this.state.number;
    }

    const habitInfo = {
      ...this.props.habit,
      rating: habit_type === 'rating' ? this.state.rating : null,
      count: habit_type === 'count' ? this.state.count : null,
      number: habit_type === 'number' ? this.state.number : null,
      last_value_added: last_value_added,
    }

    this.props.completeHabit(habitInfo)

    this.setState({ rating: '', number: '' })
  }

  dateDiff() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastCompleted = new Date(this.props.habit.last_completed);

    return lastCompleted - today;
  }


  render() {
    const { rating, number } = this.state;
    const { habit_name, habit_type, last_value_added } = this.props.habit;

    return (
      <div className={`habit-ctn ${this.dateDiff() === 0 && "completed-habit"}`}>

        <p className="name">{habit_name}</p>
        {(this.dateDiff() === 0) && <p className="check">&#10004;</p> }
        {this.dateDiff() === 0 && <p className="last-value">{last_value_added}</p>}

        <form className="response-ctn" onSubmit={this.submitHabitData}>
          {habit_type === "normal" && <div className="btn-ctn"><button className={`status-btn ${this.dateDiff() === 0 && "completed-btn"}`}>{this.dateDiff() === 0 ? "Undo" : "Done"}</button></div>}
          {habit_type === "rating" && <input className="rating-form" type="text" name="rating" onChange={this.handleChange} value={rating} />}
          {habit_type === "count" && <div className="count-btns">
            <button className="count-btn" onClick={(event) => this.countChange(event, "decrement")}>-</button>
            <button className="count-btn" onClick={(event) => this.countChange(event, "increment")}>+</button>
          </div>}
          {habit_type === "number" && <input className="number-form" type="text" name="number" onChange={this.handleChange} value={number} />}
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