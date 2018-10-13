import { fetchBudgetsSuccess, fetchBudgetsFailure } from '../actions';

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
          this.store.dispatch(fetchBudgetsSuccess(json.budgets));
          return json.budgets;
        })
        .catch(error => this.store.dispatch(fetchBudgetsFailure(error)));
    }
  }
}
