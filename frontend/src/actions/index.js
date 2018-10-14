export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const BUDGETS_REQUEST = 'BUDGETS_REQUEST';
export const BUDGETS_SUCCESS = 'BUDGETS_SUCCESS';
export const BUDGETS_FAILURE = 'BUDGETS_FAILURE';

export const BUDGET_SELECT = 'BUDGET_SELECT';
export const BUDGET_ENTRIES_SUCCESS = 'BUDGET_ENTRIES_SUCCESS';
export const BUDGET_ENTRIES_FAILURE = 'BUDGET_ENTRIES_FAILURE';

export const NAVIGATE_TO_BUDGETS = 'NAVIGATE_TO_BUDGETS';
export const NAVIGATE_TO_BUDGET = 'NAVIGATE_TO_BUDGET';
export const NAVIGATE_TO_BUDGETENTERENTRY = 'NAVIGATE_TO_BUDGETENTERENTRY';

export const ADD_ENTRY_TO_BUDGET = 'ADD_ENTRY_TO_BUDGET';
export const ADD_ENTRY_TO_BUDGET_SUCCESS = 'ADD_ENTRY_TO_BUDGET_SUCCESS';
export const ADD_ENTRY_TO_BUDGET_FAILURE = 'ADD_ENTRY_TO_BUDGET_FAILURE';

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

export const selectBudget = id => ({
  type: BUDGET_SELECT,
  payload: { id: id }
});

export const fetchBudgetEntriesSuccess = response => ({
  type: BUDGET_ENTRIES_SUCCESS,
  payload: response
});

export const fetchBudgetEntriesFailure = error => ({
  type: BUDGET_ENTRIES_FAILURE,
  payload: { error }
});

export const navToBudgets = () => ({
  type: NAVIGATE_TO_BUDGETS
});

export const addEntryToBudget = (info) => ({
  type: ADD_ENTRY_TO_BUDGET,
  payload: info
});

export const addEntryToBudgetSuccess = budget => ({
  type: ADD_ENTRY_TO_BUDGET_SUCCESS,
  payload: { budget }
});

export const addEntryToBudgetFailure = error => ({
  type: ADD_ENTRY_TO_BUDGET_FAILURE,
  payload: { error }
});

export const navToBudgetEnterEntry = () => ({
  type: NAVIGATE_TO_BUDGETENTERENTRY
});

export const navToBudget = (id) => ({
  type: NAVIGATE_TO_BUDGET,
  payload: { id: id}
});
