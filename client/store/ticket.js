import axios from 'axios'

/**
 * ACTION TYPES
 */

const GOT_TICKET = 'GOT_TICKET'

//initial state
const ticket = {}

//action creator
const gotTicket = ticket => ({
  type: GOT_TICKET,
  ticket
})

//Thunk

export const getTicket = ticket => async dispatch => {
  try {
    const returnTicket = await axios.get(`api/stocks/${ticket}`)
    dispatch(gotTicket(returnTicket.data))
  } catch (error) {
    console.error(error)
  }
}

//reducer
export default function(state = ticket, action) {
  switch (action.type) {
    case GOT_TICKET:
      return action.ticket
    default:
      return state
  }
}
