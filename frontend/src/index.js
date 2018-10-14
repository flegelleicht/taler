import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import LoginListener from './listeners/LoginListener';
import BudgetListener from './listeners/BudgetListener';
import SaveStateListener from './listeners/SaveStateListener';

import './index.css';
import App from './App';

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    loggerMiddleware
  )
);


const loginListener = new LoginListener();
loginListener.subscribe(store);
const budgetListener = new BudgetListener();
budgetListener.subscribe(store);
const saveStateListener = new SaveStateListener();
saveStateListener.subscribe(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
