import React from 'react';
import { connect } from 'react-redux';
import { 
  navToBudgets,
  addEntryToBudget
} from '../actions';

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

class EnterEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input : '',
      formattedInput: '0,00 €'
    }
    this.onKey = this.onKey.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  onChange(event) {
  }
  
  onKey(event) {
    event.stopPropagation(); event.preventDefault();
    let input = this.state.input;
    switch (event.key) {
      case '0': input += '0'; break;
      case '1': input += '1'; break;
      case '2': input += '2'; break;
      case '3': input += '3'; break;
      case '4': input += '4'; break;
      case '5': input += '5'; break;
      case '6': input += '6'; break;
      case '7': input += '7'; break;
      case '8': input += '8'; break;
      case '9': input += '9'; break;
      case 'Backspace': 
        input = input.slice(0, input.length-1); break;
      case 'Enter': 
        if (input !== '') {
          this.props.onEnter({
            at: new Date(),
            note: Math.random().toString(36).substr(2),
            amount: Number.parseInt(input)})
          input = '0';
        }
        break;
      default:
      break;
    }
    this.setState({
      input: input, 
      formattedInput: `${formatMoney(input)} €`
    });
  }
  
  render () {
    return (
      <input type="text" onKeyDown={this.onKey} onChange={this.onChange} value={this.state.formattedInput} />
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
        <EnterEntry onEnter={(entry) => this.props.dispatch(addEntryToBudget({entry, budgetId: selectedBudget.id}))}/>
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
