import React from "react";
import { Route } from "react-router-dom";
import LifeGPADisplay from "../components/LifeGPADisplay";
import HabitsList from "../components/HabitsList";
import ManageHabits from "../components/ManageHabits";
import axios from "axios";
import "./css/HomeView.css";

// https://life-gpa.herokuapp.com/

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
      totalLifeGPA: 0,
      allCompleted: false,
      showDescription: false,
    };
  }

  // Fetch habit data as soon as component mounts
  componentDidMount() {
    this.getHabits();
  }

  // builders the headers since they're all the same
  buildHeader = () => {
    const token = localStorage.getItem("token");
    const headers = { headers: { authorization: token } }
    return headers;
  }

  // Gets all habits with this user id
  getHabits = () => {
    const userId = localStorage.getItem("id");

    // Generates header with authorization: token
    const headers = this.buildHeader();

    axios
      .get(`http://localhost:5000/api/habits/${userId}/user-habits`, headers)
      // .get(`https://life-gpa.herokuapp.com/api/habits/${userId}/user-habits`, headers)
      .then(res => {
        this.setState({
          habits: res.data.habits,
          habitRecords: res.data.habitRecords,
          totalLifeGPA: res.data.lifeGPA,
          allCompleted: res.data.allComplete
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Adds a new habit
  addHabit = habitName => {
    const userId = localStorage.getItem("id");
    
    const headers = this.buildHeader();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const habitInfo = {
      habit: habitName,
      date_created: today
    };

    axios
      .post(`http://localhost:5000/api/habits/${userId}/user-habits`, habitInfo, headers)
      // .post(`https://life-gpa.herokuapp.com/api/habits/${userId}/user-habits`, habitInfo, headers)
      .then(res => {
        console.log(res.data);
        this.getHabits();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Completes a habit, will add a habit completion record to database, or remove it if habit already completed today
  completeHabit = habit => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today - 1000 * 60 * 60 * 24);
    yesterday.setHours(0, 0, 0, 0);

    const habitInfo = {
      ...habit,
      today,
      yesterday
    };

    const headers = this.buildHeader();

    axios
      .post(`http://localhost:5000/api/habits/complete-habit`, habitInfo, headers)
      // .post(`https://life-gpa.herokuapp.com/api/habits/complete-habit`, habitInfo, headers)
      .then(res => {
        // console.log(res.data);
        this.getHabits();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Deletes habit completion records and resets start date to today
  resetData = habit => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const id = habit.id

    const headers = this.buildHeader();

    axios
      .put(`http://localhost:5000/api/habits/reset-habit`, id, headers)
      // .put(`https://life-gpa.herokuapp.com/api/habits/reset-habit`, id, headers)
      .then(res => {
        this.getHabits();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Completely delets a habit and its habit records from database
  deleteHabit = habit => {
    const headers = this.buildHeader();

    axios
      .delete(`http://localhost:5000/api/habits/${habit.id}`, headers)
      // .delete(`https://life-gpa.herokuapp.com/api/habits/${habit.id}`, headers)
      .then(res => {
        this.getHabits();
      })
      .catch(err => {
        console.log(err);
        this.getHabits();
      });
  }

  // Hover event to show description of the life gpa calculation
  showGPADescription = () => {
    setTimeout(() => {this.setState({ showDescription: true })}, 700)
  }

  // Hover event to hide description of the life gpa calculation
  hideGPADescription = () => {
    this.setState({ showDescription: false })
  }

  render() {
    return (
      <div className="homeview-wrapper">

        <div onMouseEnter={() => this.showGPADescription()} onMouseLeave={() => this.hideGPADescription()}>
          <LifeGPADisplay lifeGPA={this.state.totalLifeGPA} />
        </div>

        <div className={`${this.state.showDescription ? "show-description" : "hide-description"}`}>
          <p>LifeGPA is calculated using a complex formula that you wouldn't understand. Don't worry about how we calculate it. Just know that higher is better than lower.</p>
        </div>

        <Route
          exact
          path="/home"
          render={props => (
            <HabitsList
              {...props}
              habits={this.state.habits}
              completeHabit={this.completeHabit}
              allCompleted={this.state.allCompleted}
            />
          )}
        />

        <Route
          path="/home/manage-habits"
          render={props => (
            <ManageHabits
              {...props}
              habits={this.state.habits}
              resetData={this.resetData}
              deleteHabit={this.deleteHabit}
              addHabit={this.addHabit}
            />
          )}
        />
      </div>
    );
  }
}

export default HomeView;
