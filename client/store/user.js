import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const POST_TRANSACTION = 'POST_TRANSACTION'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const postedTransaction = () => ({type: POST_TRANSACTION}) //add transaction to portfolio
// const loadPortfolio = () => ({type: LOAD_PORTFOLIO}) //load portfolio. in separate tab
const loadTransactions = () => ({TYPE: LOAD_TRANSACTIONS})
//load all transactions. Maybe show the first 6?

/**
 * THUNK CREATORS
 */

// const getPortfolio = () => async dispatch => {
//   try {
//     const allTransactions = await axios.get(`/transactions/${userId}`)
//     let portfolio = []
//     //finish up later
//   } catch (error) {
//     console.error(error)
//   }
// }

export const getTransactions = userId => async dispatch => {
  try {
    const allTransactions = await axios.get(`api/transactions/${userId}`)
    dispatch(loadTransactions(allTransactions))
  } catch (error) {
    console.error(error)
  }
}

export const postTransaction = (ticket, quantity, id) => async dispatch => {
  try {
    const transaction = {ticket, quantity, id}
    await axios.post('api/transactions', transaction)
    const allTransactions = await axios.get(`api/transactions/${id}`)
    console.log('alltransactions', allTransactions.data)
    dispatch(postedTransaction(res.data))
  } catch (err) {
    console.error(err)
  }
}

// export const loadPortfolio = () => async dispatch => {
//   try {
//     const res = await axios.get()
//   }
// }

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
