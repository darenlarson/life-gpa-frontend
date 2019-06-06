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

  componentDidMount() {
    this.getHabits();
  }

  getHabits = () => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const requestOptions = {
      headers: {
        authorization: token
      }
    };

    axios
      .get(`http://localhost:5000/api/habits/${userId}/user-habits`, requestOptions)
      // .get(`https://life-gpa.herokuapp.com/api/habits/${userId}/user-habits`, requestOptions)
      .then(res => {
        console.log(res.data);
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

  addHabit = habitName => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const requestOptions = {
      headers: {
        authorization: token
      }
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const habitInfo = {
      habit: habitName,
      date_created: today
    };

    axios
      .post(`http://localhost:5000/api/habits/${userId}/user-habits`, habitInfo, requestOptions)
      // .post(`https://life-gpa.herokuapp.com/api/habits/${userId}/user-habits`, habitInfo, requestOptions)
      .then(res => {
        console.log(res.data);
        this.getHabits();
      })
      .catch(err => {
        console.log(err);
      });
  };

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

    const token = localStorage.getItem("token");

    const requestOptions = {
      headers: {
        authorization: token
      }
    };

    axios
      .post(`http://localhost:5000/api/habits/complete-habit`, habitInfo, requestOptions)
      // .post(`https://life-gpa.herokuapp.com/api/habits/complete-habit`, habitInfo, requestOptions)
      .then(res => {
        // console.log(res.data);
        this.getHabits();
      })
      .catch(err => {
        console.log(err);
      });
  };

  resetData = habit => {
    console.log("resetData() invoked");
    console.log(habit);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updatedInfo = {
      date_created: today,
      id: habit.id
    }

    const token = localStorage.getItem("token");

    const requestOptions = {
      headers: {
        authorization: token
      }
    };

    axios
      .put(`http://localhost:5000/api/habits/reset-habit`, updatedInfo, requestOptions)
      // .put(`https://life-gpa.herokuapp.com/api/habits/reset-habit`, updatedInfo, requestOptions)
      .then(res => {
        console.log(res.data);
        this.getHabits();
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteHabit = habit => {
    console.log("deleteHabit() invoked");
    console.log(habit);

    const token = localStorage.getItem("token");

    const requestOptions = {
      headers: {
        authorization: token
      }
    };

    axios
      .delete(`http://localhost:5000/api/habits/${habit.id}`, requestOptions)
      // .delete(`https://life-gpa.herokuapp.com/api/habits/${habit.id}`, requestOptions)
      .then(res => {
        console.log(res.data);
        this.getHabits();
      })
      .catch(err => {
        console.log(err);
        this.getHabits();
      });
  }

  showGPADescription = () => {
    setTimeout(() => {this.setState({ showDescription: true })}, 700)
  }

  hideGPADescription = () => {
    this.setState({ showDescription: false })
  }

  render() {
    console.log(this.state.allCompleted);
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
