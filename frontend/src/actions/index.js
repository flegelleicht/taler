export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = credentials => ({
  type: LOGIN_REQUEST,
  payload: { credentials }
});

export const loginSuccess = info => ({
  type: LOGIN_SUCCESS,
  payload: { info }
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: { error }
});

export function login(credentials) {
  return dispatch => {
    dispatch(loginRequest(credentials));
    console.log(`Logging in with ${credentials.user}:${credentials.pass}`);
    return fetch(`https://localhost:4567/api/v1/public/login`,{
      method: 'POST',
      body: JSON.stringify(credentials)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(loginSuccess(json.token));
        return json.token;
      })
      .catch(error => dispatch(loginFailure(error)));
  }
}

function handleErrors(response) {
  if(!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
