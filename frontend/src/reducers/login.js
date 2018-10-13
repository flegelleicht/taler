import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../actions';

const initialState = {
  loading: false,
  token: null,
  failure: null
}

const login = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_REQUEST:
    return {
      ...state,
      loading: true,
      failure: null
    };
  case LOGIN_SUCCESS:
    return {
      ...state,
      loading: false,
      token: action.payload.token
    };
  case LOGIN_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      token: null
    };
  default:
    return state;
  }
}

export default login;
