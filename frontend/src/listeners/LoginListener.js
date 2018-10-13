import { loginSuccess, loginFailure } from '../actions';

function handleErrors(response) {
  if(!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export class LoginListener {
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
    let login = this.store.getState().login;
    if (login && login.loading && login.credentials) {
      console.log(`Logging in as ${login.credentials.user}!`);
      fetch(`https://localhost:4567/api/v1/public/login`,{
        method: 'POST', body: JSON.stringify(login.credentials)})
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          this.store.dispatch(loginSuccess(json.token));
          return json.token;
        })
        .catch(error => this.store.dispatch(loginFailure(error)));
    }
  }
}

export default LoginListener;
