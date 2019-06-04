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
      habitRecords: [],
      fullHabitInfo: [],
      finalHabitsArray: [],
      lifeGPA: [],
      totalLifeGPA: 0
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
        // console.log(res.data);
        this.setState({ habits: res.data });
        this.getHabitRecords();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getHabitRecords = () => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const requestOptions = {
      headers: {
        authorization: token
      }
    };

    axios
      .get(`http://localhost:5000/api/habits/${userId}/habit-records`, requestOptions)
      // .get(`https://life-gpa.herokuapp.com/api/habits/${userId}/habit-records`, requestOptions)
      .then(res => {
        // console.log(res.data);
        this.setState({ habitRecords: res.data });
        this.combineHabitInfo();
        this.calculateGPA();
        this.totalLifeGPA();
      })
      .catch(err => {
        console.log(err);
      });
  };

  combineHabitInfo = () => {
    const newHabitArray = this.state.habits.map(habit => {
      let records = this.state.habitRecords.filter(rec => {
        return rec.habit_id === habit.id;
      });

      let newHabit = { ...habit, records: records };

      return newHabit;
    });
    // console.log(newHabitArray);
    this.setState({ fullHabitInfo: newHabitArray });
  };

  calculateGPA = () => {
    // Date Variables
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // console.log("today:", today);
    const thirtyDaysAgo = new Date(today - 1000 * 60 * 60 * 24 * 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);
    const sixtyDaysAgo = new Date(today - 1000 * 60 * 60 * 24 * 60);
    sixtyDaysAgo.setHours(0, 0, 0, 0);
    const ninetyDaysAgo = new Date(today - 1000 * 60 * 60 * 24 * 90);
    ninetyDaysAgo.setHours(0, 0, 0, 0);

    // Loop over each habit the user has
    const finalHabitsArray = this.state.fullHabitInfo.map((habit, index) => {
      let thirtyCount = 0;
      let sixtyCount = 0;
      let ninetyCount = 0;

      // # of days that have passed since current habit iteration was created.
      const daysSinceCreated =
        (today - new Date(habit.date_created)) / (1000 * 60 * 60 * 24) + 1;
      // console.log("Days Since Created:", daysSinceCreated);

      // Loop over every record in the database for each habit.
      habit.records.forEach(rec => {
        // Convert the date provided from the database into the same format as local date variables.
        let date_completed = new Date(rec.date_completed);

        if (date_completed >= thirtyDaysAgo) {
          thirtyCount++;
        }
        if (date_completed >= sixtyDaysAgo) {
          sixtyCount++;
        }
        if (date_completed >= ninetyDaysAgo) {
          ninetyCount++;
        }
      });

      let thirtyGPA = 0;
      let sixtyGPA = 0;
      let ninetyGPA = 0;

      if (daysSinceCreated < 30) {
        thirtyGPA = thirtyCount / daysSinceCreated;
      } else {
        thirtyGPA = thirtyCount / 30;
      }

      if (daysSinceCreated < 60) {
        sixtyGPA = sixtyCount / daysSinceCreated;
      } else {
        sixtyGPA = sixtyCount / 30;
      }

      if (daysSinceCreated < 90) {
        ninetyGPA = ninetyCount / daysSinceCreated;
      } else {
        ninetyGPA = ninetyCount / 30;
      }

      let updatedHabit = {
        ...habit,
        thirtyGPA: thirtyGPA,
        sixtyGPA: sixtyGPA,
        ninetyGPA: ninetyGPA
      };

      return updatedHabit;
    });

    this.setState({ finalHabitsArray: finalHabitsArray });
  };

  totalLifeGPA = () => {
    const GPA = this.state.finalHabitsArray.map(habit => {
      return habit.thirtyGPA;
    });

    this.setState({ lifeGPA: GPA });

    let sumGPA = 0;
    for (let i = 0; i < GPA.length; i++) {
      sumGPA = sumGPA + GPA[i];
    }

    const totalLifeGPA = sumGPA / GPA.length;

    this.setState({ totalLifeGPA: totalLifeGPA });
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
        console.log(res.data);
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

  render() {
    return (
      <div className="homeview-wrapper">
        <LifeGPADisplay lifeGPA={this.state.totalLifeGPA} />
        {/* <AddHabit addHabit={this.addHabit} /> */}
        {/* <HabitsList
          habits={this.state.finalHabitsArray}
          completeHabit={this.completeHabit}
        /> */}

        <Route
          exact
          path="/home"
          render={props => (
            <HabitsList
              {...props}
              habits={this.state.finalHabitsArray}
              completeHabit={this.completeHabit}
            />
          )}
        />

        <Route
          path="/home/manage-habits"
          render={props => (
            <ManageHabits
              {...props}
              habits={this.state.finalHabitsArray}
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
