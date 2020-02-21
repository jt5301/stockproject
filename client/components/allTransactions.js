import React from 'react'
import {connect} from 'react-redux'

class Transactions extends React.Component {
  render() {
    let identification = 0
    return (
      <div className="transactions">
        {this.props.transactions.map(current => {
          identification += 1
          let date = current.createdAt.slice(0, 10)
          return (
            <div className="transactionItem" key={identification}>
              <ul>Ticket: {current.ticket}</ul>
              <ul>
                {' '}
                Bought {current.quantity} share(s) @ ${(
                  current.amount / current.quantity
                ).toFixed(2)}{' '}
                per share
              </ul>
              <ul>Transaction Date: {date}</ul>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    transactions: state.portfolio
  }
}

export default connect(mapState, null)(Transactions)
