import axios from 'axios'
//both portfolio and recent transactions will use transaction data. Transaction component will just be truncated and with less info. Portfolio will be compiled transactions.

//ACTION TYPES
const LOAD_TRANSACTIONS = 'LOAD_TRANSACTIONS'

//INITIAL STATE
const transactions = []

//ACTION CREATORS
const loadTransactions = transactions => ({
  type: LOAD_TRANSACTIONS,
  transactions
})

//THUNKS
export const getTransactions = userId => async dispatch => {
  try {
    const allTransactions = await axios.get(`api/transactions/${userId}`)
    dispatch(loadTransactions(allTransactions.data))
  } catch (error) {
    console.error(error)
  }
}

export const postTransaction = (ticket, quantity, id) => async dispatch => {
  try {
    const transaction = {ticket, quantity, id}
    await axios.post('api/transactions', transaction)
    const allTransactions = await axios.get(`api/transactions/${id}`)
    dispatch(loadTransactions(allTransactions.data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(state = transactions, action) {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return action.transactions
    default:
      return state
  }
}
