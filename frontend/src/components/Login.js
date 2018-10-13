import React from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUser: '',
      inputPass: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(e) {
    e.preventDefault();
    this.props.dispatch(
      loginRequest({
        user: this.state.inputUser, 
        pass: this.state.inputPass
      })
    );
  }
  
  render () {
    const { loggedIn, error, loading, user } = this.props;
    
    if (error) {
      return <div>Error! {error.message}</div>;
    }
    
    if (loading) {
      return <div>Loading...</div>;
    }
        
    return (
      <React.Fragment>
      { loggedIn === true ?
        <div>
          Logged in as { user.name }
          <button>Abmelden</button>
        </div>
      :
        <form onSubmit={this.onSubmit}>
          <input type="text"
            value={this.state.inputUser}
            onChange={(e) => this.setState({inputUser: e.target.value})}/>
          <input type="password"
            value={this.state.inputPass}
            onChange={(e) => this.setState({inputPass: e.target.value})}/>
          <input type="submit" value="Anmelden" />
        </form>
      }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  user: state.login.user,
  loading: state.login.loading,
  error: state.login.error
});

export default connect(mapStateToProps)(Login);
