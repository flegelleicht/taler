import {
  BUDGET_SELECT,
  NAVIGATE_TO_BUDGETS,
  NAVIGATE_TO_BUDGET,
  NAVIGATE_TO_BUDGETENTERENTRY,
  NAVIGATE_TO_BUDGETENTRYEDIT,
  ADD_ENTRY_TO_BUDGET_SUCCESS,
  LOGOUT_COMPLETED
} from '../actions';

let savedState = window.localStorage.getItem('state');
if (savedState) {
  savedState = JSON.parse(savedState);
  savedState = savedState.ui;
}
const defaultState = {
  selectedBudgetId: null,
  selectedEntryId: null,
  display: 'budgets',
}
const initialState = savedState || defaultState;

const ui = (state = initialState, action) => {
  switch (action.type) {
  case BUDGET_SELECT:
    return {
      ...state,
      selectedBudgetId: action.payload.id,
      display: 'budget'
    };
  case NAVIGATE_TO_BUDGETS:
    return {
      ...state,
      selectedBudgetId: null,
      display: 'budgets'
    };
  case NAVIGATE_TO_BUDGET:
    return {
      ...state,
      selectedBudgetId: action.payload.id,
      display: 'budget'
    }
  case NAVIGATE_TO_BUDGETENTERENTRY:
    return {
      ...state,
      display: 'budget.enter'
    }
  case NAVIGATE_TO_BUDGETENTRYEDIT:
    return {
      ...state,
      display: 'budget.enter',
      selectedBudgetId: action.payload.budgetId,
      selectedEntryId: action.payload.entryId
    }
  case ADD_ENTRY_TO_BUDGET_SUCCESS:
    return {
      ...state,
      selectedBudgetId: action.payload.budget.id,
      display: 'budget'
    }
  case LOGOUT_COMPLETED:
    return initialState;
  default:
    return state;
  }
}

export default ui;
