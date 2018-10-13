import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Login from './components/Login';
import Budgets from './components/Budgets';

class App extends Component {
  render() {
    return (
      <div>
        <Login />
        {this.props.loggedIn === true ?
          <Budgets />
        :
          null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn
});


export default connect(mapStateToProps)(App);
