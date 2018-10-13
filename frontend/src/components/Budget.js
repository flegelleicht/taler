import React from 'react';
import { connect } from 'react-redux';
import { 
  navToBudgets,
} from '../actions';

class BudgetEntry extends React.Component {
  render () {
    const e = this.props.entry;
    return (
      <li>
        <span className={e.type}></span>
        <span className="amount">
          {Number.parseFloat(e.amount / 100.0).toFixed(2)} 
        </span>
        <span className="note">{e.note}</span>
      </li>
    );
  }
}

class Budget extends React.Component {
  render() {
    const selectedBudget = 
      this.props.budgets.find(b => b.id === this.props.selectedBudgetId);
    const entries = 
      selectedBudget.entries.map(e =>  <BudgetEntry key={e.id} entry={e} />);
      
    return (
      <React.Fragment>
        <div>
          <button onClick={() => {this.props.dispatch(navToBudgets())}}>
            &lt; Alle Budgets
          </button>
        </div>
        <h3>{selectedBudget.name}</h3>
        <ul>
          {entries}
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  budgets: state.data.budgets,
  selectedBudgetId: state.ui.selectedBudgetId
});


export default connect(mapStateToProps)(Budget);
