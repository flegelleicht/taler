import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_COMPLETED
} from '../actions';

let savedState = window.localStorage.getItem('state');
if (savedState) {
  savedState = JSON.parse(savedState);
  savedState = savedState.login;
}
const defaultState = {
  loading: false,
  token: null,
  loggedIn: false,
  loggingOut: false,
  user: null,
  failure: null,
  credentials: null
};

const initialState = savedState || defaultState;

const login = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_REQUEST:
    return {
      ...state,
      loading: true,
      credentials: action.payload.credentials
    };
  case LOGIN_SUCCESS:
    return {
      ...state,
      loading: false,
      loggedIn: true,
      token: action.payload.token,
      user: action.payload.user,
      credentials: null
    };
  case LOGIN_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      token: null,
      credentials: null
    };
  case LOGOUT_REQUEST:
    return {
      ...state,
      loggingOut: true
    };
  case LOGOUT_COMPLETED:
    return defaultState;
  default:
    return state;
  }
}

export default login;
