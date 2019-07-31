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
    };
  }

  // Handler for setting on state habitName, habitType daysGoal, ratingGoal, countGoal, and numberGoal
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Submits the habit entered, invokes addHabit(), which sends habit to server
  handleSubmit = e => {
    e.preventDefault();

    // Create habitInfo object that will be sent to the server
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const habitInfo = {
      habitName: this.state.habitName,
      date_created: today,
      habitType: this.state.habitType,
      daysGoal: this.state.daysGoal === '' ? null : this.state.daysGoal,
      ratingGoal: this.state.ratingGoal === '' ? null : this.state.ratingGoal,
      countGoal: this.state.countGoal === '' ? null : this.state.countGoal,
      numberGoal: this.state.numberGoal === '' ? null : this.state.numberGoal
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
              {this.state.habitType === 'rating' && <input onChange={this.handleChange} value={this.state.ratingsGoal} type="text" name="ratingGoal" placeholder="Rating out of 10" />}
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
