export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = credentials => ({
  type: LOGIN_REQUEST,
  payload: { credentials }
});

export const loginSuccess = info => ({
  type: LOGIN_SUCCESS,
  payload: { token: info.token, user: info.user }
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: { error }
});
