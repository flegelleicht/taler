import {
  BUDGETS_REQUEST,
  BUDGETS_SUCCESS,
  BUDGETS_FAILURE,
  BUDGET_SELECT,
} from '../actions';

const initialState = {
  loadingBudgets: false,
  loadingEntries: false,
  budgetId: null,
  failure: null,
  budgets: []
}

const data = (state = initialState, action) => {
  switch (action.type) {
  case BUDGETS_REQUEST:
    return {
      ...state,
      loadingBudgets: true,
    };
  case BUDGETS_SUCCESS:
    return {
      ...state,
      loadingBudgets: false,
      budgets: action.payload.budgets,
    };
  case BUDGETS_FAILURE:
    return {
      ...state,
      loadingBudgets: false,
      error: action.payload.error,
    };
  case BUDGET_SELECT:
    return {
      ...state,
      loadingEntries: true,
      budgetId: action.payload.id
    };
  default:
    return state;
  }
}

export default data;
