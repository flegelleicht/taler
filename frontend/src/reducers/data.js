import {
  BUDGETS_REQUEST,
  BUDGETS_SUCCESS,
  BUDGETS_FAILURE,
  BUDGET_ENTRIES_SUCCESS,
  BUDGET_ENTRIES_FAILURE,
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
  case BUDGET_ENTRIES_SUCCESS:
    let changedBudgetId = action.payload.budgetId;
    let budgets = state.budgets;
    let index = budgets.findIndex(b => b.id === changedBudgetId);
    let budget = {...budgets[index], entries: action.payload.entries};
    let newBudgets = [
      ...budgets.slice(0, index), 
      budget, 
      ...budgets.slice(index + 1)
    ];

    return {
      ...state,
      loadingEntries: false,
      budgetId: null,
      budgets: newBudgets
    }
    
  case BUDGET_ENTRIES_FAILURE:
    return {
      ...state,
      loadingEntries: false,
      budgetId: null,
      error: action.payload.error,
    };
  default:
    return state;
  }
}

export default data;
