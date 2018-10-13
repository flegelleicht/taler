import {
  BUDGET_ENTRIES_SUCCESS
} from '../actions';

const initialState = {
  selectedBudgetId: null,
}

const ui = (state = initialState, action) => {
  switch (action.type) {
  case BUDGET_ENTRIES_SUCCESS:
    return {
      ...state,
      selectedBudgetId: action.payload.budgetId
    };
  default:
    return state;
  }
}

export default ui;
