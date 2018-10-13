import {
  BUDGET_ENTRIES_SUCCESS,
  NAVIGATE_TO_BUDGETS
} from '../actions';

const initialState = {
  selectedBudgetId: null,
  display: 'budgets',
}

const ui = (state = initialState, action) => {
  switch (action.type) {
  case BUDGET_ENTRIES_SUCCESS:
    return {
      ...state,
      selectedBudgetId: action.payload.budgetId,
      display: 'budget'
    };
  case NAVIGATE_TO_BUDGETS:
    return {
      ...state,
      selectedBudgetId: null,
      display: 'budgets'
    };
  default:
    return state;
  }
}

export default ui;
