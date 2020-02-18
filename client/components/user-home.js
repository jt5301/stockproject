import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getTicket} from '../store/ticket'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      ticket: '',
      quantity: 0,
      validTicketandQuantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.ticketLookUp = this.ticketLookUp.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    if (event.target.name === 'quantity') {
      this.setState({
        quantity: parseFloat(event.target.value, 10)
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  async ticketLookUp() {
    await this.props.getTicket(this.state.ticket)
    if (this.props.ticket === 'invalid ticket') {
      this.setState({
        validTicketandQuantity: 'invalid ticket'
      })
      return
    }
    console.log(typeof this.state.quantity)
    if (!Number.isInteger(this.state.quantity) || this.state.quantity <= 0) {
      this.setState({
        validTicketandQuantity: 'invalid quantity'
      })
      return
    }
    this.setState({
      validTicketandQuantity: 'show message'
    })
  }
  buy() {}

  render() {
    console.log(this.state)
    return (
      <div className="form">
        <h3>Welcome, {this.props.email}</h3>
        <div> You have ${this.props.cash} dollars to buy more stocks with.</div>

        <form onSubmit={this.handleSearch}>
          <label htmlFor="ticket">Ticket:</label>
          <input name="ticket" type="text" onChange={this.handleChange} />

          <label htmlFor="quantity">Quantity</label>
          <input name="quantity" type="number" onChange={this.handleChange} />
        </form>
        <div className="buttons">
          <button onClick={this.ticketLookUp} type="lookUp">
            Look Up
          </button>

          <button
            disabled={!this.state.validTicketandQuantity}
            onClick={() => this.buy(this.state.ticket, this.state.quantity)}
            type="buy"
          >
            Buy
          </button>
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
    ticket: state.ticket
  }
}

const mapDispatch = dispatch => {
  return {
    getTicket: ticket => dispatch(getTicket(ticket))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
