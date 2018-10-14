import { logoutCompleted } from '../actions';

export default class SaveStateListener {
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
    if (this.store.getState().login.loggingOut) {
      window.localStorage.removeItem('state');
      this.store.dispatch(logoutCompleted());
    } else {
      const state = this.store.getState();
      window.localStorage.setItem('state', JSON.stringify(state));
    }
  }
}
