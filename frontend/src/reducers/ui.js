import {
  BUDGET_SELECT,
  NAVIGATE_TO_BUDGETS,
  NAVIGATE_TO_BUDGET,
  NAVIGATE_TO_BUDGETENTERENTRY
} from '../actions';

const initialState = {
  selectedBudgetId: null,
  display: 'budgets',
}

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
  default:
    return state;
  }
}

export default ui;
