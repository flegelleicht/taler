import React from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../actions';

class Login extends React.Component {
  render () {
    const { error, loading, token, user } = this.props;
    
    if (error) {
      return <div>Error! {error.message}</div>;
    }
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (token) {
      return <div>Logged in as { user.name }</div>;
    }
    
    return (
      <button onClick={() => this.props.dispatch(loginRequest({user: 'flgl', pass: 'PexS27kfzHz2Me0G9oNYTg'}))}>Anmelden</button>
    )
  }
}

const mapStateToProps = state => ({
  token: state.login.token,
  user: state.login.user,
  loading: state.login.loading,
  error: state.login.error
});

export default connect(mapStateToProps)(Login);
