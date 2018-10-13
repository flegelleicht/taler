import React from 'react';
import { connect } from 'react-redux';
import { 
  navToBudgets,
} from '../actions';

function formatMoney(amount) {
  return Number.parseFloat(amount / 100.0).toFixed(2)
}

class BudgetEntry extends React.Component {
  render () {
    const e = this.props.entry;
    return (
      <li>
        <span className={e.type}></span>
        <span className="amount">
          {formatMoney(e.amount)} 
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
        <div>
          <div id="total">
            insgesamt: {formatMoney(selectedBudget.amount)}</div>
          <div id="remaining-today" className="spent-total">
            heute übrig: {formatMoney(selectedBudget.remainingToday)}</div>
          <div id="remaining-tomorrow" className="spent-total">
            morgen übrig: {formatMoney(selectedBudget.remainingTomorrow)}</div>
          <div id="remaining-total" className="spent-total">
            insgesamt übrig: {formatMoney(selectedBudget.remainingTotal)}</div>
          <div id="spent-today" className="spent-total">
            heute ausgegeben: {formatMoney(selectedBudget.spentToday)}</div>
          <div id="spent-total" className="spent-total">
            ingesamt ausgegeben: {formatMoney(selectedBudget.spentTotal)}</div>
        </div>
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
