import React from 'react';
import { connect } from 'react-redux';
import { 
  navToBudget
} from '../actions';
import './EnterEntry.css';

function formatMoney(amount) {
  return Number.parseFloat(amount / 100.0).toFixed(2)
}

function formatAmountInput(type, amount) {
	return `${type === 'expense' ? '- ' : '+ '}${formatMoney(amount)} €`;
}

class EnterEntry extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      amount : '',
      formattedInput: '',
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
		this.onKeyboard = this.onKeyboard.bind(this);
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
        amount: '',
        formattedInput: '',
        type: 'expense'
      })
    }
  }
  
  onCancel() {
    this.props.dispatch(navToBudget(this.props.budget.id));
  }
  
  onKey(event) {
		this.onKeyboard(event);
  }

	onKeyboard(event) {
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
      formattedInput: formatAmountInput(type, amount)
    });
	}
  
  render () {
    return (
			<div id="enter-entry-wrapper">
        <div id="enter-entry-datetime">
          <input type="date" id="enter-entry-date" className="input"
            onChange={this.onDateChange}
            value={this.state.date}/>
          <input type="time" id="enter-entry-time" className="input"
            onChange={this.onTimeChange}
            value={this.state.time}/>
        </div>

        <div>
          <input type="text" className="input" id="enter-entry-note" 
						placeholder="Notiz"
            onChange={this.onNoteChange}
            value={this.state.note} />
        </div>

        <div id="enter-entry-amount-container">
          <input type="text" className="input" id="enter-entry-amount"
						placeholder="0,00 €"
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							this.onKeyboard({key: (this.state.type === 'expense') ? '+' : '-'});
						}}
            onKeyDown={this.onKey} 
            onChange={this.onAmountChange} 
            value={this.state.formattedInput} />
        </div>
				
				<div id="enter-entry-keyboard">
					<button className="kb" onClick={(e)=> this.onKeyboard({key: e.target.innerText})}>1</button>
					<button className="kb" onClick={(e)=> this.onKeyboard({key: e.target.innerText})}>2</button>
					<button className="kb" onClick={(e)=> this.onKeyboard({key: e.target.innerText})}>3</button>
					<button className="kb" onClick={(e)=> this.onKeyboard({key: e.target.innerText})}>4</button>
					<button className="kb" onClick={(e)=> this.onKeyboard({key: e.target.innerText})}>5</button>
					<button className="kb" onClick={(e)=> this.onKeyboard({key: e.target.innerText})}>6</button>
					<button className="kb" onClick={(e)=> this.onKeyboard({key: e.target.innerText})}>7</button>
					<button className="kb" onClick={(e)=> this.onKeyboard({key: e.target.innerText})}>8</button>
					<button className="kb" onClick={(e)=> this.onKeyboard({key: e.target.innerText})}>9</button>
					<button className="kb" onClick={(e)=> this.onKeyboard({key: 'Backspace'})}>⌫</button>
					<button className="kb" onClick={(e)=> this.onKeyboard({key: e.target.innerText})}>0</button>
					<button className="kb" onClick={this.onEnter}>✓</button>
					<button className="kb" onClick={this.onCancel}>Abbrechen</button>
				</div>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  budgets: state.data.budgets,
  selectedBudgetId: state.ui.selectedBudgetId,
  screen: state.ui.display,
});


export default connect(mapStateToProps)(EnterEntry);
