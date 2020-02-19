import React from 'react'
import {connect} from 'react-redux'
import {getTransactions} from '../store/portfolio'
import {getTicket} from '../store'

//change recent into portfolio. also decrement cash!

const PortfolioComponent = props => {
  if (props.transactions.length === 0)
    return <div>No Transactions Available</div>

  let performance = ['red', 'gray', 'green']
  let portfolioAmount = {}
  let portfolioQuantity = {}
  let transax = props.transactions //array of all transactions
  for (let i = 0; i < transax.length; i++) {
    if (!portfolioAmount[transax[i].ticket]) {
      portfolioAmount[transax[i].ticket] = transax[i].amount
      portfolioQuantity[transax[i].ticket] = transax[i].quantity
    } else {
      portfolioAmount[transax[i].ticket] += transax[i].amount
      portfolioQuantity[transax[i].ticket] += transax[i].quantity
    }
  }
  for (let ticket in portfolioAmount) {
    let color = props.getTicket(ticket)
    console.log('in loop', color)
  }
  console.log('portfolio', portfolioAmount, portfolioQuantity, transax)
  let identification = 0
  return Object.keys(portfolioAmount).map(current => {
    identification += 1
    return (
      <div className="PortfolioItem" key={identification}>
        <ul>Company: {current}</ul>
        <ul>Quantity: {portfolioQuantity[current]}</ul>
        {/* <ul>Today's Amount: ${portfolioAmount[current]}</ul> */}
      </div>
    )
  })
}

const mapDispatch = dispatch => {
  return {
    getTicket: ticket => dispatch(getTicket(ticket))
  }
}
export const Portfolio = connect(null, mapDispatch)(PortfolioComponent)
