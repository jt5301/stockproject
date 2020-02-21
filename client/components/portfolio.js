import React from 'react'
const axios = require('axios')

//change recent into portfolio. also decrement cash!

export default class Portfolio extends React.Component {
  constructor() {
    super()
    this.state = {
      todaysPrices: {},
      todaysPerformance: {},
      quantity: {}
    }
  }
  async componentDidUpdate(prevProps) {
    if (this.props.transactions !== prevProps.transactions) {
      let transactions = this.props.transactions
      let portfolioQuantity = {}
      let updatedPrices = {}
      let updatedPerformance = {}
      for (let i = 0; i < transactions.length; i++) {
        if (!portfolioQuantity[transactions[i].ticket]) {
          portfolioQuantity[transactions[i].ticket] = transactions[i].quantity
        } else {
          portfolioQuantity[transactions[i].ticket] += transactions[i].quantity
        }
      }

      for (let ticket in portfolioQuantity) {
        let ticketData = (await axios.get(`/api/stocks/${ticket}`)).data
        updatedPrices[ticket] =
          portfolioQuantity[ticket] * ticketData.latestPrice
        let performance = ticketData.latestPrice - ticketData.previousClose
        if (performance < 0) updatedPerformance[ticket] = 'red'
        else if (performance > 0) updatedPerformance[ticket] = 'green'
        else if (performance === 0) updatedPerformance[ticket] = 'gray'
      }
      this.setState({
        quantity: portfolioQuantity,
        todaysPrices: updatedPrices,
        todaysPerformance: updatedPerformance
      })
    }
  }

  render() {
    let identification = 0
    let total = 0
    for (let ticket in this.state.quantity) {
      let individualTotal =
        this.state.quantity[ticket] * this.state.todaysPrices[ticket]
      total += individualTotal
    }
    return (
      <>
        <h3>Portfolio</h3>
        <div>
          {Object.keys(this.state.quantity).map(current => {
            identification += 1
            return (
              <div className="PortfolioItem" key={identification}>
                <ul>Ticket: {current}</ul>
                <ul>Quantity: {this.state.quantity[current]} share(s)</ul>
                <ul className="value">
                  Today's Value:
                  <div
                    style={{color: `${this.state.todaysPerformance[current]}`}}
                  >
                    {' '}
                    ${this.state.todaysPrices[current].toFixed(2)}
                  </div>
                </ul>
              </div>
            )
          })}
        </div>
        <div style={{textAlign: 'right'}}>Total: ${total.toFixed(2)}</div>
      </>
    )
  }
}
