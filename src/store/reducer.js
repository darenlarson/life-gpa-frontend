import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_HABITS_START,
  GET_HABITS_SUCCESS,
  GET_HABITS_FAILURE,
  ADD_HABIT_START,
  ADD_HABIT_SUCCESS,
  ADD_HABIT_FAILURE,
  COMPLETE_HABIT_START,
  COMPLETE_HABIT_SUCCESS,
  COMPLETE_HABIT_FAILURE,
  RESET_HABIT_START,
  RESET_HABIT_SUCCESS,
  RESET_HABIT_FAILURE,
  DELETE_HABIT_START,
  DELETE_HABIT_SUCCESS,
  DELETE_HABIT_FAILURE
} from "./actions";


const initialState = {
  gettingHabits: false,
  habits: [],
  habitRecords: [],
  totalLifeGPA: 0,
  allCompleted: false,
  loading: true,
  loggingIn: false,
  loggedIn: false,
  registering: false,
  registered: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_START:
      return {
        ...state,
        loggingIn: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        error: false
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.payload
      }
    case LOGOUT_USER:
      return {
        state: initialState
      }
    case REGISTER_START:
      return {
        ...state,
        registering: true,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        registered: true,
        error: false,
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
        error: action.payload,
      }
    case GET_HABITS_START:
      return {
        ...state,
        gettingHabits: true,
      }
    case GET_HABITS_SUCCESS:
      return {
        ...state,
        totalLifeGPA: action.payload.lifeGPA,
        allCompleted: action.payload.allComplete,
        error: false,
        gettingHabits: false,
      }
    case GET_HABITS_FAILURE:
      return {
        ...state,
        error: action.payload,
        gettingHabits: false,
      }
    case ADD_HABIT_START:
      return {

      }
    case ADD_HABIT_SUCCESS:
      return {}
    case ADD_HABIT_FAILURE:
      return {}
    case COMPLETE_HABIT_START:
      return {}
    case COMPLETE_HABIT_SUCCESS:
      return {}
    case COMPLETE_HABIT_FAILURE:
      return {}
    case RESET_HABIT_START:
      return {}
    case RESET_HABIT_SUCCESS:
      return {}
    case RESET_HABIT_FAILURE:
      return {}
    case DELETE_HABIT_START:
      return {}
    case DELETE_HABIT_SUCCESS:
      return {}
    case DELETE_HABIT_FAILURE:
      return {}

    default:
      return state
  }
}

export default reducer;