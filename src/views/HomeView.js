import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getHabits, addHabit, completeHabit, deleteHabit, resetData } from "../store/actions";
// import LifeGPADisplay from "../components/LifeGPADisplay";
// import HabitsList from "../components/HabitsList"; 
import HabitsListNew from "../components/HabitsListNew";
import ManageHabits from "../components/ManageHabits";
import HabitsDataList from "../components/HabitsDataList";
import "../css/index.css";

import ClipLoader from "react-spinners/ClipLoader";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  // Fetch habit data as soon as component mounts
  componentDidMount() {
    this.props.getHabits();

    // Shows loading spinner for half second
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="homeview-wrapper spinner">
          <ClipLoader
            sizeUnit={"px"}
            size={100}
            color={"#D87B92"}
            loading={this.state.loading}
          />
        </div>
      );
    } else {
      return (
        <div className="homeview-wrapper">
          <Route
            exact
            path="/habits/home"
            render={props => (
              <HabitsListNew
                {...props}
                habits={this.props.habits}
                completeHabit={this.props.completeHabit}
                allCompleted={this.props.allCompleted}
              />
            )}
          />

          <Route
            path="/habits/home/manage-habits"
            render={props => (
              <ManageHabits
                {...props}
                habits={this.props.habits}
                resetData={this.props.resetData}
                deleteHabit={this.props.deleteHabit}
                addHabit={this.props.addHabit}
              />
            )}
          />

          <Route
            path="/habits/home/habit-data"
            render={props => (
              <HabitsDataList
                {...props}
                habits={this.props.habits}
              />
            )}
          />

        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    habits: state.habits,
    allCompleted: state.allCompleted,
    totalLifeGPA: state.totalLifeGPA
  };
};

export default connect(
  mapStateToProps,
  { getHabits, addHabit, completeHabit, deleteHabit, resetData }
)(HomeView);
