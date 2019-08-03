import React from "react";
import PropTypes from "prop-types";
// import './css/AddHabit.css';
import "../css/index.css";

class AddHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habitName: "",
      habitType: "",
      daysGoal: "",
      ratingGoal: "",
      countGoal: "",
      numberGoal: "",
      daysGoalError: false,
      ratingGoalError: false,
    };
  }

  // Handler for setting on state habitName, habitType daysGoal, ratingGoal, countGoal, and numberGoal
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, daysGoalError: false, ratingGoalError: false, });
  };

  // Submits the habit entered, invokes addHabit(), which sends habit to server
  handleSubmit = e => {
    e.preventDefault();

    // Data validation in Days per Week and ratings goal forms
    if (this.state.habitType === "normal" && (this.state.daysGoal < 1 || this.state.daysGoal > 7)) {
      this.setState({ daysGoalError: true });
      return;
    }
    if (this.state.habitType === "rating" && (this.state.ratingGoal < 1 || this.state.ratingGoal > 10)) {
      this.setState({ ratingGoalError: true})
      return;
    }

    // Create habitInfo object that will be sent to the server
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Grab userId
    const userId = localStorage.getItem("id");

    const habitInfo = {
      habit_name: this.state.habitName,
      date_created: today,
      habit_type: this.state.habitType,
      days_per_week_goal: this.state.daysGoal === '' ? null : this.state.daysGoal,
      ratings_goal: this.state.ratingGoal === '' ? null : this.state.ratingGoal,
      count_goal: this.state.countGoal === '' ? null : this.state.countGoal,
      number_goal: this.state.numberGoal === '' ? null : this.state.numberGoal,
      user_id: userId,
    }

    // Sends the new habit to the server
    this.props.addHabit(habitInfo);

    // Resets the add habit form to blank
    this.setState({
      habitName: "",
      habitType: "",
      daysGoal: "",
      ratingGoal: "",
      countGoal: "",
      numberGoal: "",
      });
  };

  render() {
    return (
      <div className="add-habit-wrapper">
        <form className="habit-form" onSubmit={this.handleSubmit}>
          <div class="habit-name-ctn">
            <h4>Habit Name</h4>
            <input
              className="habit-name"
              required
              type="text"
              name="habitName"
              onChange={this.handleChange}
              value={this.state.habitName}
              placeholder="Enter a name for your habit..."
            />
          </div>

          <div className="habit-type-ctn">
            <h4>Habit Type</h4>
            <div className="habit-types">
              <div className="habit-type">
                <input onChange={this.handleChange} type="radio" id="normal" name="habitType" value="normal" />
                <label for="normal">Normal</label>
              </div>
              <div className="habit-type">
                <input onChange={this.handleChange} type="radio" id="rating" name="habitType" value="rating" />
                <label for="rating">Rating</label>
              </div>
              <div className="habit-type">
                <input onChange={this.handleChange} type="radio" id="count" name="habitType" value="count" />
                <label for="count">Count</label>
              </div>
              <div className="habit-type">
                <input onChange={this.handleChange} type="radio" id="number" name="habitType" value="number" />
                <label for="number">Number</label>
              </div>
            </div>
          </div>

          <div className="habit-goal-ctn">
              {this.state.habitType === 'normal' && <input onChange={this.handleChange} value={this.state.daysGoal}    type="text" name="daysGoal"   placeholder="Days per Week" />}
              {this.state.daysGoalError === true && <p>Please enter a number between 1 and 7</p>}
              {this.state.habitType === 'rating' && <input onChange={this.handleChange} value={this.state.ratingsGoal} type="text" name="ratingGoal" placeholder="Rating out of 10" />}
              {this.state.ratingGoalError === true && <p>Please enter a number between 1 and 10</p>}
              {this.state.habitType === 'count' &&  <input onChange={this.handleChange} value={this.state.countGoal}   type="text" name="countGoal"  placeholder="Goal for each day" />}
              {this.state.habitType === 'number' && <input onChange={this.handleChange} value={this.state.numberGoal}  type="text" name="numberGoal" placeholder="Target number" />}
          </div>

          <button type="submit">ADD</button>
        </form>
      </div>
    );
  }
}

AddHabit.propTypes = {
  addHabit: PropTypes.func.isRequired
};

export default AddHabit;
