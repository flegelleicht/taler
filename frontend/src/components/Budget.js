import React from 'react';
import { connect } from 'react-redux';
import { 
  navToBudgetEnterEntry,
  navToBudgetEntryEdit,
  addEntryToBudget,
  updateEntryInBudget,
  deleteEntry,
} from '../actions';
import './Budget.css';
import EnterEntry from './EnterEntry'

function formatMoney(amount) {
  return `${Number.parseFloat(amount / 100.0).toFixed(2)} €`;
}

class BudgetEntry extends React.Component {
  render () {
    const e = this.props.entry;
    return (
      <li className="budget-entry"
        onClick={() => this.props.onEdit(e.id)}>
        <div className={`budget-entry-amount ${e.type}`}>
          {formatMoney(e.amount)} 
        </div>
        <div className="budget-entry-note">{e.note === '' ? 'Stuff' : e.note}</div>
        <div className="budget-entry-at">
					<div>{(new Date(e.at)).toLocaleDateString("de-DE")}</div>
          <div>{(new Date(e.at)).toLocaleTimeString("de-DE")}</div>
        </div>
      </li>
    );
  }
}

class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.onEditEntry = this.onEditEntry.bind(this);
  }
  
  onEditEntry (id) {
    this.props.dispatch(
      navToBudgetEntryEdit({
        budgetId: this.props.selectedBudgetId,
        entryId: id
      }));
  }
  
  render() {
		const renderStat = (stat) => {
			return (
				<div key={stat.key} id={stat.id} className="budget-stat">
					<div className="budget-stat-value">{stat.value}</div>
					<div className="budget-stat-text">{stat.text}</div>
				</div>
			);
		}
    const selectedBudget = 
      this.props.budgets.find(b => b.id === this.props.selectedBudgetId);
		const stats = [
			['remainingTomorrow', 'morgen übrig'],
			['amount', 'insgesamt'],
			//['remainingTotal', 'insgesamt übrig'],
			//['spentToday', 'heute ausgegeben'],
			['spentTotal', 'insgesamt ausgegeben'],
		].map((s) => renderStat({key: s[0], value: formatMoney(selectedBudget[s[0]]), text: s[1]}));

    const entries = 
      selectedBudget.entries.map(e =>  <BudgetEntry key={e.id} entry={e} onEdit={this.onEditEntry}/>);
    
    const selectedEntry = this.props.selectedEntryId ? selectedBudget.entries.find(e => e.id === this.props.selectedEntryId) : null;
    
    return (
			<div className={this.props.screen === 'budget.enter' ? 'budget-display-with-enter' : 'budget-display'}>
        <div className="budget-stats">
					<h3 className="budget">{selectedBudget.name}</h3>
					{renderStat({	
							key: 'remainingToday', 
							value: formatMoney(selectedBudget['remainingToday']),
							text: 'heute übrig',
							id: 'remaining-today'
						}
					)}
					{renderStat({	
							key: 'remainingDays', 
							value: selectedBudget['remainingDays'],
							text: 'verbleibende Tage',
							id: 'remaining-days'
						}
					)}
					{stats}
        </div>
        <ul id="budget-entries">
          {entries}
        </ul>
        { this.props.screen === 'budget.enter' ? 
          selectedEntry ?
            <EnterEntry 
              entry={selectedEntry}
              budget={selectedBudget}
              onDelete={(entryId) => this.props.dispatch(
                deleteEntry(entryId)
              )}
              onEnter={(entry) => this.props.dispatch(
                updateEntryInBudget({entry, budgetId: selectedBudget.id}))}
            />
          :
            <EnterEntry 
              budget={selectedBudget}
              onEnter={(entry) => this.props.dispatch(addEntryToBudget({entry, budgetId: selectedBudget.id}))}
            />
          :
					<div id="budget-entry-enter-container">
						<button id="budget-entry-enter" 
							onClick={() => this.props.dispatch(navToBudgetEnterEntry())}>
							<span>+</span>
						</button>
					</div>
        }
			</div>
    );
  }
}

const mapStateToProps = state => ({
  budgets: state.data.budgets,
  selectedBudgetId: state.ui.selectedBudgetId,
  selectedEntryId: state.ui.selectedEntryId,
  screen: state.ui.display,
});


export default connect(mapStateToProps)(Budget);
