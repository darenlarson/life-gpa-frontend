import React, { Component } from "react";
import axios from "axios";
import { Route, withRouter } from "react-router-dom";
import Header from "./components/Header";
import CredentialsView from "./views/CredentialsView";
import HomeView from "./views/HomeView";
import Footer from "./components/Footer";
import "./App.css";
import MobileFooter from "./components/MobileFooter";

// https://life-gpa.herokuapp.com/

class App extends Component {
  registerUser = userInfo => {
    axios
      .post(`http://localhost:5000/api/users/register`, userInfo)
      // .post(`https://life-gpa.herokuapp.com//api/users/register`, userInfo)
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
      // .post(`https://life-gpa.herokuapp.com/api/users/login`, userInfo)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/home");
      })
      .catch(err => {
        console.log(err);
      });
  };

  logoutUser = e => {
    e.preventDefault();

    localStorage.removeItem("id");
    localStorage.removeItem("token");

    this.props.history.push("/");
  };

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => (
            <Header
              {...props}
              logoutUser={this.logoutUser}
            />
          )}
        />

        <div className="main">
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
        <Route path="/" component={Footer} />
        <Route path="/home" component={MobileFooter} />
      </div>
    );
  }
}

export default withRouter(App);
