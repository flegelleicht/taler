import React from 'react';
import { connect } from 'react-redux';
import { fetchBudgetsRequest, selectBudget } from '../actions';

import './Budgets.css';

class Budgets extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchBudgetsRequest());
  }
  
  render() {
    const budgets = this.props.budgets.map(
      b =>	<li	key={b.id} className="budget-item"
								onClick={()=>this.props.dispatch(selectBudget(b.id))}>
								<span>{b.name}</span>
								<span>▷</span>
						</li>
    );

    return (
      <React.Fragment>
        <h3 className="budgets">Budgets</h3>
        <ul>
          {budgets}
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  budgets: state.data.budgets,
  selectedBudgetId: state.ui.selectedBudgetId
});


export default connect(mapStateToProps)(Budgets);
