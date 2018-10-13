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
    
    let selectedBudget = null;
    let entries = null;
    if (this.props.selectedBudgetId) {
      selectedBudget = this.props.budgets.find(b => b.id === this.props.selectedBudgetId);
      entries = selectedBudget.entries.map(
        e =>  <li key={e.id}>
                <span className={e.type}></span>
                <span className="amount">
                {Number.parseFloat(e.amount / 100.0).toFixed(2)} 
                </span>
                <span className="note">{e.note}</span>
              </li>
      );
    }
    return(
      <React.Fragment>
        <h2>Budgets:</h2>
        <ul>
          {budgets}
        </ul>
        { selectedBudget ?
          <React.Fragment>
          <h3>{selectedBudget.name}</h3>
          <ul>
            {entries}
          </ul>
          </React.Fragment>
        :
          null
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  budgets: state.data.budgets,
  selectedBudgetId: state.ui.selectedBudgetId
});


export default connect(mapStateToProps)(Budgets);
