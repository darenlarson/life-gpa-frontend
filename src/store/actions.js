import axios from 'axios';


export const LOGIN_START = "LOGIN_STARTING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";
export const REGISTER_START = "REGISTER_STARTING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const GET_HABITS_START = "GET_HABITS_START";
export const GET_HABITS_SUCCESS = "GET_HABITS_SUCCESS";
export const GET_HABITS_FAILURE = "GET_HABITS_FAILURE";
export const GET_HABIT_RECORDS_START = "GET_HABIT_RECORDS_START";
export const GET_HABIT_RECORDS_SUCCESS = "GET_HABIT_RECORDS_SUCCESS";
export const GET_HABIT_RECORDS_FAILURE = "GET_HABIT_RECORDS_FAILURE";
export const ADD_HABIT_START = "ADD_HABIT_START";
export const ADD_HABIT_SUCCESS = "ADD_HABIT_SUCCESS";
export const ADD_HABIT_FAILURE = "ADD_HABIT_FAILURE";
export const COMPLETE_HABIT_START = "COMPLETE_HABIT_START";
export const COMPLETE_HABIT_SUCCESS = "COMPLETE_HABIT_SUCCESS";
export const COMPLETE_HABIT_FAILURE = "COMPLETE_HABIT_FAILURE";
export const RESET_HABIT_START = "RESET_HABIT_START";
export const RESET_HABIT_SUCCESS = "RESET_HABIT_SUCCESS";
export const RESET_HABIT_FAILURE = "RESET_HABIT_FAILURE";
export const DELETE_HABIT_START = "DELETE_HABIT_START";
export const DELETE_HABIT_SUCCESS = "DELETE_HABIT_SUCCESS";
export const DELETE_HABIT_FAILURE = "DELETE_HABIT_FAILURE";

const baseURL = `https://life-gpa.herokuapp.com`;
// const baseURL = 'http://localhost:5000';

export const loginUser = (history, userInfo) => dispatch => {
  dispatch({ type: LOGIN_START, message: "Logging user in" });

  axios
    .post(`${baseURL}/api/users/login`, userInfo)
    .then(res => {
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("token", res.data.token);

      history.push("/habits/home");

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: err });
    });
};

export const registerUser = (history, userInfo) => dispatch => {
  dispatch({ type: REGISTER_START, message: "Registering user" });

  axios
    .post(`${baseURL}/api/users/register`, userInfo)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, message: "Registration successful" });
    })
    .then(() => {
      dispatch(loginUser(history, userInfo));
    })
    .then(() => {
      loginUser(history, userInfo);
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAILURE, payload: err });
    });
};

export const logoutUser = history => {
  history.push("/");
  localStorage.removeItem("id");
  localStorage.removeItem("token");

  return { type: LOGOUT_USER }
}

function buildHeader() {
  const token = localStorage.getItem("token");
  const headers = { headers: { authorization: token } };
  
  return headers;
};

export const getHabits = () => dispatch => {
  dispatch({ type: GET_HABITS_START, message: "Fetching habits" });

  const userId = localStorage.getItem("id");

  const headers = buildHeader();

  axios
    .get(`${baseURL}/api/habits/${userId}/user-habits`, headers)
    .then(res => {
      dispatch({ type: GET_HABITS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_HABITS_FAILURE, payload: err });
    });
};


export const addHabit = habitInfo => dispatch => {
  dispatch({ type: ADD_HABIT_START, message: "Adding a habit" });

  const userId = localStorage.getItem("id");
  const headers = buildHeader();

  axios
    .post(`${baseURL}/api/habits/${userId}/user-habits`, habitInfo, headers)
    .then(res => {
      dispatch({ type: ADD_HABIT_SUCCESS, payload: res });
    })
    .then(() => {
      dispatch(getHabits());
    })
    .catch(err => {
      dispatch({ type: ADD_HABIT_FAILURE, payload: err });
    });
};


export const completeHabit = habit => dispatch => {
  dispatch({ type: COMPLETE_HABIT_START, message: "Completing habit" });
  
  const headers = buildHeader();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today - 1000 * 60 * 60 * 24);
  yesterday.setHours(0, 0, 0, 0);

  const habitInfo = { ...habit, today, yesterday };

  axios
    .post(`${baseURL}/api/habits/complete-habit`, habitInfo, headers)
    .then(res => {
      dispatch({ type: COMPLETE_HABIT_SUCCESS, payload: res });
    })
    .then(() => {
      dispatch(getHabits());
    })
    .catch(err => {
      dispatch({ type: COMPLETE_HABIT_FAILURE, payload: err });
    });
};


export const resetData = habit => dispatch => {
  dispatch({ type: RESET_HABIT_START, message: "Resetting habit data" });
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const headers = buildHeader();
  const body = { id: habit.id, today: today };


  axios
    .put(`${baseURL}/api/habits/reset-habit`, body, headers)
    .then(res => {
      dispatch({ type: RESET_HABIT_SUCCESS, payload: res });
    })
    .then(() => {
      dispatch(getHabits());
    })
    .catch(err => {
      dispatch({ type: RESET_HABIT_FAILURE, payload: err });
    });
};


export const deleteHabit = habit => dispatch => {
  dispatch({ type: DELETE_HABIT_START, message: "Deleting habit" });

  const headers = buildHeader();

  axios
    .delete(`${baseURL}/api/habits/${habit.id}`, headers)
    .then(res => {
      dispatch({ type: DELETE_HABIT_SUCCESS, payload: res });
    })
    .then(() => {
      dispatch(getHabits());
    })
    .catch(err => {
      dispatch({ type: DELETE_HABIT_FAILURE, payload: err });
      getHabits();
    });
};
