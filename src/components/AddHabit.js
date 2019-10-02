import React from "react";
import PropTypes from "prop-types";
import "../css/index.css";

class AddHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habitName: "",
      habitType: null,
      daysGoal: "",
      ratingGoal: "",
      countGoal: "",
      numberGoal: "",
      daysGoalError: false,
      ratingGoalError: false,
      checkedRadioButton: null,
    };
  }

  // Handler for setting on state habitName, habitType daysGoal, ratingGoal, countGoal, and numberGoal
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, daysGoalError: false, ratingGoalError: false, });
  };

  dataValidation = () => {
    const { daysGoal, habitType, ratingGoal } = this.state;
    // Data validation in Days per Week and ratings goal forms
    if (habitType === "normal" && (daysGoal < 1 || daysGoal > 7)) this.setState({ daysGoalError: true });
    else if (habitType === "rating" && (ratingGoal < 1 || ratingGoal > 10)) this.setState({ ratingGoalError: true});
    else return true;

    return false;
  }

  // Submits the habit entered, invokes addHabit(), which sends habit to server
  handleSubmit = e => {
    e.preventDefault();

    const { countGoal, daysGoal, habitName, habitType, numberGoal, ratingGoal } = this.state,
            userId = localStorage.getItem("id");

    if (!this.dataValidation()) return;

    // Create habitInfo object that will be sent to the server
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const habitInfo = {
      habit_name: habitName,
      date_created: today,
      habit_type: habitType,
      days_per_week_goal: daysGoal === '' ? null : daysGoal,
      ratings_goal: ratingGoal === '' ? null : ratingGoal,
      count_goal: countGoal === '' ? null : countGoal,
      number_goal: numberGoal === '' ? null : numberGoal,
      user_id: userId,
    }

    // Sends the new habit to the server
    this.props.addHabit(habitInfo);

    // Resets the add habit form to blank
    this.setState({ habitName: "", habitType: "", daysGoal: "", ratingGoal: "", countGoal: "", numberGoal: "" });
  };

  render() {
    const { countGoal, daysGoal, daysGoalError, habitName, habitType, numberGoal, ratingsGoal, ratingGoalError } = this.state;
    const radioButtons = [ 'normal', 'rating', 'count', 'number' ];

    return (
      <div className="add-habit-wrapper">
        <form className="habit-form" onSubmit={this.handleSubmit}>
          <div className="habit-name-ctn">
            <h4>Habit Name</h4>
            <input required className="habit-name" type="text" name="habitName" onChange={this.handleChange} value={habitName} placeholder="Enter a name for your habit..." />
          </div>

          <div className="habit-type-ctn">
            <h4>Habit Type</h4>
            <div className="habit-types">
              {radioButtons.map(radio => (
                <label><input checked={radio === habitType} onChange={this.handleChange} type="radio" id={radio} name="habitType" value={radio} />{radio}</label>
              ))}
            </div>
          </div>

          <div className="habit-goal-ctn">
            {habitType === 'normal' && <input onChange={this.handleChange} value={daysGoal}    type="number" name="daysGoal"   placeholder="Days per Week" />}
            {habitType === 'rating' && <input onChange={this.handleChange} value={ratingsGoal} type="number" name="ratingGoal" placeholder="Rating out of 10" />}
            {habitType === 'count' &&  <input onChange={this.handleChange} value={countGoal}   type="number" name="countGoal"  placeholder="Goal for each day" />}
            {habitType === 'number' && <input onChange={this.handleChange} value={numberGoal}  type="number" name="numberGoal" placeholder="Target number" />}
          </div>
          {daysGoalError === true && <p style={{border: '1px solid red'}}>Please enter a number between 1 and 7</p>}
          {ratingGoalError === true && <p>Please enter a number between 1 and 10</p>}

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
