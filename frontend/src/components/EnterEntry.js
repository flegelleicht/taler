import React from 'react';
import { connect } from 'react-redux';
import { 
  navToBudget
} from '../actions';

function formatMoney(amount) {
  return Number.parseFloat(amount / 100.0).toFixed(2)
}

class EnterEntry extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      amount : '',
      formattedInput: '0,00 €',
      note: '',
      type: 'expense',
      at: date,
      date: date.toISOString().slice(0,10),
      time: date.toLocaleTimeString('de-DE', {hour:'2-digit', minute: '2-digit'}),
    }
    this.onKey = this.onKey.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  
  onAmountChange(event) {
  }
  
  onNoteChange(event) {
    this.setState({
      note: event.target.value
    });
  }
  
  onDateChange(event) {
    let date = new Date(`${event.target.value}T${this.state.time}`)
    console.log(`onDateChange: ${event.target.value} => ${date}`)
    this.setState({
      at: date,
      date: event.target.value
    });
  }
  
  onTimeChange(event) {
    let date = new Date(`${this.state.date}T${event.target.value}`)
    console.log(`onTimeChange: ${event.target.value} => ${date}`)
    this.setState({
      at: date,
      time: event.target.value
    });
  }
  
  onEnter(event) {
    if (this.state.amount !== '') {
      this.props.onEnter({
        at: this.state.at,
        type: this.state.type,
        note: this.state.note,
        amount: Number.parseInt(this.state.amount)
      });
      this.setState({
        note: '',
        amount: '0,00',
        formattedInput: '0,00 €',
        type: 'expense'
      })
    }
  }
  
  onCancel() {
    this.props.dispatch(navToBudget(this.props.budget.id));
  }
  
  onKey(event) {
    //event.stopPropagation(); event.preventDefault();
    let amount = this.state.amount;
    let type = this.state.type;
    switch (event.key) {
      case '-': type = 'expense'; break;
      case '+': type = 'income'; break;
      case '0': amount += '0'; break;
      case '1': amount += '1'; break;
      case '2': amount += '2'; break;
      case '3': amount += '3'; break;
      case '4': amount += '4'; break;
      case '5': amount += '5'; break;
      case '6': amount += '6'; break;
      case '7': amount += '7'; break;
      case '8': amount += '8'; break;
      case '9': amount += '9'; break;
      case 'Backspace': 
        amount = amount.slice(0, amount.length-1); break;
      case 'Enter': 
        this.onEnter(); 
        break;
      default:
      break;
    }
    this.setState({
      amount: amount, 
      type: type,
      formattedInput: `${formatMoney(amount)} €`
    });
  }
  
  render () {
    return (
      <React.Fragment>
        <div>
          {this.state.type === 'expense' ? '–' : ''}
          <input type="text" 
            onKeyDown={this.onKey} 
            onChange={this.onAmountChange} 
            value={this.state.formattedInput} />
        </div>
        <div>
          <input type="text" 
            onChange={this.onNoteChange}
            value={this.state.note} />
        </div>
        <div>
          <input type="date"
            onChange={this.onDateChange}
            value={this.state.date}/>
          <input type="time"
            onChange={this.onTimeChange}
            value={this.state.time}/>
        </div>
        <button onClick={this.onCancel}>Abbrechen</button>
        <button onClick={this.onEnter}>Eingeben</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  budgets: state.data.budgets,
  selectedBudgetId: state.ui.selectedBudgetId,
  screen: state.ui.display,
});


export default connect(mapStateToProps)(EnterEntry);
