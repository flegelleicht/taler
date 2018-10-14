import React from 'react';
import { connect } from 'react-redux';
import { 
  navToBudgets,
  navToBudgetEnterEntry,
  addEntryToBudget
} from '../actions';
import EnterEntry from './EnterEntry'

function formatMoney(amount) {
  return Number.parseFloat(amount / 100.0).toFixed(2)
}

class BudgetEntry extends React.Component {
  render () {
    const e = this.props.entry;
    return (
      <li>
        <div className={e.type}></div>
        <div className="amount">
          {formatMoney(e.amount)} 
        </div>
        <div className="at">
          {(new Date(e.at)).toLocaleDateString("de-DE")}
          {(new Date(e.at)).toLocaleTimeString("de-DE")}
        </div>
        <div className="note">{e.note}</div>
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
          <div id="remaining-days" className="remaining-days">
            verbleibende Tage: {selectedBudget.remainingDays}</div>
          <div id="remaining-today" className="remaining-today">
            heute übrig: {formatMoney(selectedBudget.remainingToday)}</div>
          <div id="remaining-tomorrow" className="remaining-tomorrow">
            morgen übrig: {formatMoney(selectedBudget.remainingTomorrow)}</div>
          <div id="remaining-total" className="remaining-total">
            insgesamt übrig: {formatMoney(selectedBudget.remainingTotal)}</div>
          <div id="spent-today" className="spent-today">
            heute ausgegeben: {formatMoney(selectedBudget.spentToday)}</div>
          <div id="spent-total" className="spent-total">
            ingesamt ausgegeben: {formatMoney(selectedBudget.spentTotal)}</div>
        </div>
        <ul>
          {entries}
        </ul>
        { this.props.screen === 'budget.enter' ? 
          <EnterEntry 
            budget={selectedBudget}
            onEnter={(entry) => this.props.dispatch(addEntryToBudget({entry, budgetId: selectedBudget.id}))}/>
          :
          <button 
            onClick={() => this.props.dispatch(navToBudgetEnterEntry())}>
            +
          </button>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  budgets: state.data.budgets,
  selectedBudgetId: state.ui.selectedBudgetId,
  screen: state.ui.display,
});


export default connect(mapStateToProps)(Budget);
