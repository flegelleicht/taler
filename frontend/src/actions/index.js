export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const BUDGETS_REQUEST = 'BUDGETS_REQUEST';
export const BUDGETS_SUCCESS = 'BUDGETS_SUCCESS';
export const BUDGETS_FAILURE = 'BUDGETS_FAILURE';

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

export const fetchBudgetsRequest = () => ({
  type: BUDGETS_REQUEST,
});

export const fetchBudgetsSuccess = budgets => ({
  type: BUDGETS_SUCCESS,
  payload: { budgets }
});

export const fetchBudgetsFailure = error => ({
  type: BUDGETS_FAILURE,
  payload: { error }
});

