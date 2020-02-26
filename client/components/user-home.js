import React from 'react'
import {connect} from 'react-redux'
import {getTicket} from '../store/ticket'
import {postTransaction, getTransactions} from '../store/portfolio'
import {subtractCash} from '../store/user'
import Portfolio from './portfolio'
import LookUpMessage from './LookUpMessage'

class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      ticket: {},
      quantity: NaN,
      validTicketandQuantity: '',
      buySuccess: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.ticketLookUp = this.ticketLookUp.bind(this)
  }
  async componentDidMount() {
    await this.props.getTransactions(this.props.id)
  }

  handleChange(event) {
    event.preventDefault()
    if (event.target.name === 'quantity') {
      this.setState({
        quantity: parseFloat(event.target.value, 10)
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        validTicketandQuantity: ''
      })
    }
  }

  async ticketLookUp() {
    await this.props.getTicket(this.state.ticket)
    if (this.props.ticket === 'invalid ticket') {
      this.setState({
        validTicketandQuantity: 'invalid ticket',
        buySuccess: ''
      })
      return
    }
    if (!Number.isInteger(this.state.quantity) || this.state.quantity <= 0) {
      this.setState({
        validTicketandQuantity: 'invalid quantity',
        buySuccess: ''
      })
      return
    }
    this.setState({
      validTicketandQuantity: this.props.ticket,
      buySuccess: ''
    })
  }
  async buy() {
    const ticket = this.props.ticket
    const totalCost = (this.state.quantity * ticket.latestPrice).toFixed(2)

    if (totalCost > this.props.cash) {
      this.setState({
        buySuccess: 'Not Enough',
        validTicketandQuantity: ''
      })
      return
    }
    await this.props.subtractCash(this.props.id, totalCost)

    this.setState({
      buySuccess: 'Purchased',
      validTicketandQuantity: ''
    })
    this.props.postTransaction(ticket, this.state.quantity, this.props.id)
  }
  // lookUpMessage() {
  //   const ticket = this.props.ticket
  //   if (!this.state.quantity) return ''
  //   switch (this.state.validTicketandQuantity) {
  //     case 'invalid ticket':
  //       return 'Please enter a valid ticket.'
  //     case 'invalid quantity':
  //       return 'Please enter a valid quantity greater than zero.'
  //     case 'show message':
  //       return `${
  //         ticket.companyName
  //         } is currently priced at $${ticket.latestPrice.toFixed(
  //           2
  //         )} per share. Click the 'Buy' button to buy ${
  //         this.state.quantity
  //         } share(s).`
  //     default:
  //       return ''
  //   }
  // }
  buyMessage() {
    if (this.state.buySuccess === 'Not Enough') {
      return "You don't have enough in your account to complete this transaction."
    }
    if (this.state.buySuccess === 'Purchased') {
      return 'Purchase Successful!'
    }
  }
  render() {
    return (
      <div className="mainWrapper">
        <div className="form">
          <h3>Welcome, {this.props.email}</h3>
          <div>
            You have ${this.props.cash.toFixed(2)} dollars to buy more stocks
            with.
          </div>

          <form onSubmit={this.handleSearch}>
            <label htmlFor="ticket">Ticket:</label>
            <input name="ticket" type="text" onChange={this.handleChange} />

            <label htmlFor="quantity">Quantity</label>
            <input name="quantity" type="number" onChange={this.handleChange} />
          </form>
          <div className="buttons">
            <button onClick={this.ticketLookUp} type="button">
              Look Up
            </button>

            <button
              disabled={this.state.validTicketandQuantity !== this.props.ticket}
              onClick={() => this.buy()}
              type="button"
            >
              Buy
            </button>
            <div className="Message">
              <LookUpMessage
                quantity={this.state.quantity}
                valid={this.state.validTicketandQuantity}
              />
            </div>

            <div className="Message">{this.buyMessage()}</div>
          </div>
        </div>
        <div className="vl" />
        <div className="Portfolio">
          <div>
            <Portfolio transactions={this.props.transactions} />
          </div>
        </div>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cash: state.user.cash,
    email: state.user.email,
    id: state.user.id,
    ticket: state.ticket,
    transactions: state.portfolio
  }
}

const mapDispatch = dispatch => {
  return {
    getTicket: ticket => dispatch(getTicket(ticket)),
    postTransaction: (ticket, quantity, id) =>
      dispatch(postTransaction(ticket, quantity, id)),
    getTransactions: userId => dispatch(getTransactions(userId)),
    subtractCash: (userId, cashRemaining) =>
      dispatch(subtractCash(userId, cashRemaining))
  }
}

export default connect(mapState, mapDispatch)(UserHome)
