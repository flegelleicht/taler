import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Login from './components/Login';
import Budgets from './components/Budgets';
import Budget from './components/Budget';

class App extends Component {
  render() {
    
    let screen;
    switch (this.props.display) {
    case 'budgets':
      screen = <Budgets />;
      break;
    case 'budget':
      screen = <Budget />;
      break;
    case 'budget.enter':
      screen = <Budget />
      break;
          
    default:
      screen = null
      break;
    }
    
    return (
      <React.Fragment>
        <Login />
        {this.props.loggedIn ? screen : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  display: state.ui.display
});


export default connect(mapStateToProps)(App);
