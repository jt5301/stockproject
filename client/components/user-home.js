import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const {cash} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <div> You have ${cash} dollars to buy more stocks with.</div>
    </div>
  )
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
