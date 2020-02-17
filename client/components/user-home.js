import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      ticket: '',
      quantity: '',
      validTicketandQuantity: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLookUp = this.handleLookUp.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLookUp() {}

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
          <input name="quantity" type="Integer" onChange={this.handleChange} />
        </form>
        <div className="buttons">
          <button onClick={this.handleLookUp} type="lookUp">
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
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
