import React from "react";
import './css/LandingPage.css';
import usersImg from "../assets/users.svg";
import trackedImg from "../assets/tracked.svg";
import workoutImg from "../assets/workout.svg";
import noSmokeImg from "../assets/no-smoke.svg";
import bookImg from "../assets/book.svg";
import bitCoinImg from "../assets/bitcoin.svg";
import meditationImg from "../assets/meditation.svg";
import hugImg from "../assets/hug.svg";
import oneImg from "../assets/one.svg";
import twoImg from "../assets/two.svg";
import goalImg from "../assets/goal.svg";
import threeImg from "../assets/three.svg";
import progressImg from "../assets/progress.svg";
import fourImg from "../assets/four.svg";
import shareImg from "../assets/share.svg";
import fiveImg from "../assets/five.svg";
import adjustImg from "../assets/adjust.svg";
import sixImg from "../assets/six.svg";
import achieveImg from "../assets/achieve.svg";

const baseURL = 'https://life-gpa.netlify.com';
// const baseURL = 'http://localhost:3000';

const LandingPage = () => {
  return (
    <div className="landing">
      <header>
        <div className="navigation">
          <h1>Life GPA</h1>
          {/* <nav> */}
            <a href={`${baseURL}/habits/login`}>
              <button id="login">Login</button>
            </a>
          {/* </nav> */}
        </div>
        <section className="header-content">
          <h1>
            Ready to become
            <br />
            your best self?
          </h1>
          <a href={`${baseURL}/habits/login`}>
            <button>Let's go!</button>
          </a>
        </section>
      </header>

      <section className="content">
        <div className="achievements">
          <h1>Help us grow these numbers!</h1>
          <div className="achievement">
            <img src={usersImg} alt="" />
            <h1>250K</h1>
            <h2>active users</h2>
          </div>
          <div className="achievement">
            <img src={trackedImg} alt="" />
            <h1>50K</h1>
            <h2>different habits tracked</h2>
          </div>
          <div className="achievement">
            <img src={workoutImg} alt="" />
            <h1>1M</h1>
            <h2>workouts completed</h2>
          </div>
          <div className="achievement">
            <img src={noSmokeImg} alt="" />
            <h1>10M</h1>
            <h2>cigarettes not smoked</h2>
          </div>
          <div className="achievement">
            <img src={bookImg} alt="" />
            <h1>500K</h1>
            <h2>books read</h2>
          </div>
          <div className="achievement">
            <img src={bitCoinImg} alt="" />
            <h1>500</h1>
            <h2>bitcoins saved</h2>
          </div>
          <div className="achievement">
            <img src={meditationImg} alt="" />
            <h1>100K</h1>
            <h2>meditations completed</h2>
          </div>
          <div className="achievement">
            <img src={hugImg} alt="" />
            <h1>1.5M</h1>
            <h2>hugs received</h2>
          </div>
        </div>

        <div className="how-it-works">
          <div className="hiw-left">
            <h1>How does it work?</h1>
          </div>
          <div className="hiw-right">
            <div className="step hide-step" id="first">
              <img className="number" src={oneImg} alt="" />
              <img src={trackedImg} alt="" />
              <h2>Register on our platform</h2>
            </div>
            <div className="step hide-step">
              <img className="number" src={twoImg} alt="" />
              <img src={goalImg} alt="" />
              <h2>Set up your goals</h2>
            </div>
            <div className="step hide-step">
              <img className="number" src={threeImg} alt="" />
              <img src={progressImg} alt="" />
              <h2>Track your progress daily</h2>
            </div>
            <div className="step hide-step">
              <img className="number" src={fourImg} alt="" />
              <img src={shareImg} alt="" />
              <h2>Share your results - if you want to</h2>
            </div>
            <div className="step hide-step">
              <img className="number" src={fiveImg} alt="" />
              <img src={adjustImg} alt="" />
              <h2>Adjust</h2>
            </div>
            <div className="step hide-step" id="last">
              <img className="number" src={sixImg} alt="" />
              <img src={achieveImg} alt="" />
              <h2>Achieve!</h2>
            </div>
          </div>
        </div>

        <div className="phrase">
          <h1>
            “If you believe you can change - if you make it a habit - the change
            becomes real.”
          </h1>
          <h2>
            ― Charles Duhigg, The Power of Habit: Why We Do What We Do in Life
            and Business
          </h2>
          <a href="https://brave-jang-f6c7a9.netlify.com/signUp">
            <button>Ready?</button>
          </a>
        </div>

        <footer>
          <h1>Life GPA</h1>
          <p>2019 Copyright Life GPA - All rights reserved -</p>
        </footer>
      </section>
    </div>
  );
};

export default LandingPage;
