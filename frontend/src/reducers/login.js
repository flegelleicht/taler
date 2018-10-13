import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../actions';

const initialState = {
  loading: false,
  token: null,
  loggedIn: false,
  user: null,
  failure: null,
  credentials: null
}

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
  default:
    return state;
  }
}

export default login;
