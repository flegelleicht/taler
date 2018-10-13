import React from 'react';
import { connect } from 'react-redux';
import { fetchBudgetsRequest, selectBudget } from '../actions';

class Budgets extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchBudgetsRequest());
  }
  
  render() {
    const budgets = this.props.budgets.map(
      b => <li key={b.id} onClick={()=>this.props.dispatch(selectBudget(b.id))}>{b.name}</li>
    );
    return(
      <ul>
        {budgets}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  budgets: state.data.budgets
});


export default connect(mapStateToProps)(Budgets);
