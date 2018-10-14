export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_COMPLETED = 'LOGOUT_COMPLETED';

export const BUDGETS_REQUEST = 'BUDGETS_REQUEST';
export const BUDGETS_SUCCESS = 'BUDGETS_SUCCESS';
export const BUDGETS_FAILURE = 'BUDGETS_FAILURE';

export const BUDGET_SELECT = 'BUDGET_SELECT';
export const BUDGET_ENTRIES_SUCCESS = 'BUDGET_ENTRIES_SUCCESS';
export const BUDGET_ENTRIES_FAILURE = 'BUDGET_ENTRIES_FAILURE';

export const NAVIGATE_TO_BUDGETS = 'NAVIGATE_TO_BUDGETS';
export const NAVIGATE_TO_BUDGET = 'NAVIGATE_TO_BUDGET';
export const NAVIGATE_TO_BUDGETENTERENTRY = 'NAVIGATE_TO_BUDGETENTERENTRY';
export const NAVIGATE_TO_BUDGETENTRYEDIT = 'NAVIGATE_TO_BUDGETENTRYEDIT';
export const ADD_ENTRY_TO_BUDGET = 'ADD_ENTRY_TO_BUDGET';
export const ADD_ENTRY_TO_BUDGET_SUCCESS = 'ADD_ENTRY_TO_BUDGET_SUCCESS';
export const ADD_ENTRY_TO_BUDGET_FAILURE = 'ADD_ENTRY_TO_BUDGET_FAILURE';
export const UPDATE_ENTRY_IN_BUDGET = 'UPDATE_ENTRY_IN_BUDGET';
export const UPDATE_ENTRY_IN_BUDGET_SUCCESS = 'UPDATE_ENTRY_IN_BUDGET_SUCCESS';
export const UPDATE_ENTRY_IN_BUDGET_FAILURE = 'UPDATE_ENTRY_IN_BUDGET_FAILURE';
export const DELETE_ENTRY = 'DELETE_ENTRY';

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

export const logoutRequest = () => ({
  type:  LOGOUT_REQUEST
});

export const logoutCompleted = () => ({
  type: LOGOUT_COMPLETED
})

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

export const navToBudgetEntryEdit = (info) => ({
  type: NAVIGATE_TO_BUDGETENTRYEDIT,
  payload: info
});

export const updateEntryInBudget = (info) => ({
  type: UPDATE_ENTRY_IN_BUDGET,
  payload: info
});

export const updateEntryInBudgetSuccess = budget => ({
  type: UPDATE_ENTRY_IN_BUDGET_SUCCESS,
  payload: { budget }
});

export const updateEntryInBudgetFailure = () => ({
  type: UPDATE_ENTRY_IN_BUDGET_FAILURE
});

export const deleteEntry = (id) => ({
  type: DELETE_ENTRY,
  payload: { id: id }
});

