import {
  BUDGETS_REQUEST,
  BUDGETS_SUCCESS,
  BUDGETS_FAILURE,
  BUDGET_ENTRIES_SUCCESS,
  BUDGET_ENTRIES_FAILURE,
  ADD_ENTRY_TO_BUDGET,
  ADD_ENTRY_TO_BUDGET_SUCCESS,
  ADD_ENTRY_TO_BUDGET_FAILURE,
  UPDATE_ENTRY_IN_BUDGET,
  UPDATE_ENTRY_IN_BUDGET_SUCCESS,
  UPDATE_ENTRY_IN_BUDGET_FAILURE,
  DELETE_ENTRY,
  DELETE_ENTRY_SUCCESS,
  DELETE_ENTRY_FAILURE,
} from '../actions';

let savedState = window.localStorage.getItem('state');
if (savedState) {
  savedState = JSON.parse(savedState);
  savedState = savedState.data;
}
const defaultState = {
  loadingBudgets: false,
  loadingEntries: false,
  addEntry: false,
  addEntryInfo: null,
  updateEntry: false,
  updateEntryInfo: null,
  budgetId: null,
  failure: null,
  budgets: []
}
const initialState = savedState || defaultState;

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
  case ADD_ENTRY_TO_BUDGET:
    return {
      ...state,
      addEntry: true,
      addEntryInfo: action.payload
    };
  case ADD_ENTRY_TO_BUDGET_SUCCESS:
    {
      let changedBudget = action.payload.budget;
      let budgets = state.budgets;
      let index = budgets.findIndex(b => b.id === changedBudget.id);
      let newBudgets = [
        ...budgets.slice(0, index), 
        changedBudget, 
        ...budgets.slice(index + 1)
      ];

      return {
        ...state,
        addEntry: false,
        addEntryInfo: null,
        budgets: newBudgets
      };
    }
  case ADD_ENTRY_TO_BUDGET_FAILURE:
    return {
      ...state,
      addEntry: false,
      addEntryInfo: null
    };
  case UPDATE_ENTRY_IN_BUDGET:
    return {
      ...state,
      updateEntry: true,
      updateEntryInfo: action.payload
    };
  case UPDATE_ENTRY_IN_BUDGET_SUCCESS:
    {
      let changedBudget = action.payload.budget;
      let budgets = state.budgets;
      let index = budgets.findIndex(b => b.id === changedBudget.id);
      let newBudgets = [
        ...budgets.slice(0, index), 
        changedBudget, 
        ...budgets.slice(index + 1)
      ];

      return {
        ...state,
        updateEntry: false,
        updateEntryInfo: null,
        budgets: newBudgets
      };
    }
  case UPDATE_ENTRY_IN_BUDGET_FAILURE:
    return {
      ...state,
      updateEntry: false,
      updateEntryInfo: null,
    };
  case DELETE_ENTRY:
    return {
      ...state,
      deleteEntry: true,
      deleteEntryInfo: action.payload
    };
  case DELETE_ENTRY_SUCCESS:
    {
      let changedBudget = action.payload.budget;
      let budgets = state.budgets;
      let index = budgets.findIndex(b => b.id === changedBudget.id);
      let newBudgets = [
        ...budgets.slice(0, index), 
        changedBudget, 
        ...budgets.slice(index + 1)
      ];

      return {
        ...state,
        deleteEntry: false,
        deleteEntryInfo: null,
        budgets: newBudgets
      };
    }
  case DELETE_ENTRY_FAILURE:
    return {
      ...state,
      deleteEntry: false,
      deleteEntryInfo: null,
    };
  default:
    return state;
  }
}

export default data;
