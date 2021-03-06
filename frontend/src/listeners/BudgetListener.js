import { 
  fetchBudgetsSuccess, 
  fetchBudgetsFailure,
  fetchBudgetEntriesSuccess,
  fetchBudgetEntriesFailure,
  addEntryToBudgetSuccess,
  addEntryToBudgetFailure,
  updateEntryInBudgetSuccess,
  updateEntryInBudgetFailure,
  deleteEntrySuccess,
  deleteEntryFailure,
 } from '../actions';

function handleErrors(response) {
  if(!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export default class BudgetListener {
  constructor(store) {
    this.store = null
    this.unsubscribe = null;
    this.subscribe = this.subscribe.bind(this);
    this.onChange = this.onChange.bind(this);
    
    this.selectedBudgetId = null;
  }
  
  subscribe(store) {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.store = store;
    this.unsubscribe = this.store.subscribe(this.onChange);
  }
  
  onChange() {
    let state = this.store.getState();
    let isBudgetRequest = state.data.loadingBudgets === true;
    let token = state.login.token;

    if (isBudgetRequest && token) {
      fetch(`https://localhost:4567/api/v1/private/budgets`,{
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          this.store.dispatch(
            fetchBudgetsSuccess(json.budgets)
          );
          return json.budgets;
        })
        .catch(error => this.store.dispatch(
          fetchBudgetsFailure(error)
        ));
    } 
    
    else if (state.data.loadingEntries && state.data.budgetId) {
      let id = state.data.budgetId;
      fetch(`https://localhost:4567/api/v1/private/budgets/${id}/entries`,{
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          this.store.dispatch(
            fetchBudgetEntriesSuccess({
              budgetId: id,
              entries: json.entries
            }));
          return json.entries;
        })
        .catch(error => this.store.dispatch(
          fetchBudgetEntriesFailure(error)
        ));      
    }
    
    else if (state.data.addEntry && state.data.addEntryInfo) {
      let id = state.data.addEntryInfo.budgetId;
      let entry = state.data.addEntryInfo.entry;
      fetch(`https://localhost:4567/api/v1/private/budgets/${id}/entries`,{
        method: 'POST',
        headers: {'Authorization': `Bearer ${token}`},
        body: JSON.stringify({entry: entry})
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          this.store.dispatch(
            addEntryToBudgetSuccess(json.budget));
          return json.budget;
        })
        .catch(error => this.store.dispatch(
          addEntryToBudgetFailure(error)
        ));      
    }

    else if (state.data.updateEntry && state.data.updateEntryInfo) {
      let id = state.data.updateEntryInfo.budgetId;
      let entry = state.data.updateEntryInfo.entry;
      fetch(`https://localhost:4567/api/v1/private/budgets/${id}/entries/${entry.id}`,{
        method: 'PUT',
        headers: {'Authorization': `Bearer ${token}`},
        body: JSON.stringify({entry: entry})
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          this.store.dispatch(
            updateEntryInBudgetSuccess(json.budget));
          return json.budget;
        })
        .catch(error => this.store.dispatch(
          updateEntryInBudgetFailure(error)
        ));      
    }
    
    else if (state.data.deleteEntry && state.data.deleteEntryInfo) {
      let id = state.data.deleteEntryInfo.id;
      fetch(`https://localhost:4567/api/v1/private/entries/${id}`,{
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${token}`}
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          this.store.dispatch(
            deleteEntrySuccess(json.budget));
          return json.budget;
        })
        .catch(error => this.store.dispatch(
          deleteEntryFailure(error)
        ));      
    }
    
  }
}
