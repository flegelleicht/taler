import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  render () {
    const { error, loading, token } = this.props;
    
    if (error) {
      return <div>Error! {error.message}</div>;
    }
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (token) {
      return <div>Logged in with {token}</div>;
    }
    
    return (
      <button onClick={() => this.props.dispatch(login({user: 'flgl', pass: 'PexS27kfzHz2Me0G9oNYTg'}))}>Anmelden</button>
    )
  }
}

const mapStateToProps = state => ({
  token: state.login.token,
  loading: state.login.loading,
  error: state.login.error
});

export default connect(mapStateToProps)(Login);
