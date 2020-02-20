import axios from 'axios'

//ACTION TYPES
const GOT_TICKET = 'GOT_TICKET'

//initial state
const ticket = {}

//action creator
const gotTicket = ticketData => ({
  type: GOT_TICKET,
  ticketData
})

//THUNK

export const getTicket = ticketData => async dispatch => {
  try {
    const returnTicket = await axios.get(`api/stocks/${ticketData}`)
    console.log(returnTicket)
    dispatch(gotTicket(returnTicket.data))
  } catch (error) {
    dispatch(gotTicket('invalid ticket'))
    console.error(error)
  }
}

//REDUCER
export default function(state = ticket, action) {
  switch (action.type) {
    case GOT_TICKET:
      return action.ticket
    default:
      return state
  }
}
