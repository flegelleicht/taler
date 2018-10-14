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
    this.onKey = this.onKey.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
  onAmountChange(event) {
  }
  
  onKey(event) {
    //event.stopPropagation(); event.preventDefault();
    let amount = this.state.amount;
    switch (event.key) {
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
      formattedInput: `${formatMoney(amount)} €`
    });
  }
  
  render () {
    return (
      <React.Fragment>
        <div>
          <input type="text" 
            onKeyDown={this.onKey} 
            onChange={this.onAmountChange} 
            value={this.state.formattedInput} />
        </div>
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
