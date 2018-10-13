import React from 'react';
import { connect } from 'react-redux';

class Budgets extends React.Component {
  render() {
    return(
      <h3>Budgets</h3>
    );
  }
}

const mapStateToProps = state => ({
});


export default connect(mapStateToProps)(Budgets);
