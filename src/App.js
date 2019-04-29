import React, { Component } from "react";
import axios from "axios";
import { Route, withRouter } from "react-router-dom";
import Header from './components/Habit';
import CredentialsView from "./views/CredentialsView";
import HomeView from "./views/HomeView";
import "./App.css";

class App extends Component {
  registerUser = userInfo => {
    axios
      .post(`http://localhost:5000/api/users/register`, userInfo)
      .then(res => {
        console.log(res.data);
        this.loginUser(userInfo);
      })
      .catch(err => {
        console.log(err);
      });
  };

  loginUser = userInfo => {
    axios
      .post(`http://localhost:5000/api/users/login`, userInfo)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("id", res.data.id);
        this.props.history.push("/home");
      })
      .catch(err => {
        console.log(err);
      });
  };


  render() {
    return (
      <div className="App">
        {/* <Route path="/home" component={Header} /> */}
        <Route
          exact
          path="/"
          render={props => (
            <CredentialsView
              {...props}
              registerUser={this.registerUser}
              loginUser={this.loginUser}
            />
          )}
        />

        <Route path="/home" render={props => <HomeView {...props} />} />
      </div>
    );
  }
}

export default withRouter(App);
