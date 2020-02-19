import React from 'react'

const RecentTransactions = props => {
  let mostRecent = []
  console.log(props.transactions.data)
  if (!props.transactions.data) return <div>No Transactions Available</div>

  for (let i = props.transactions.data.length - 1; i <= 6; i++) {
    mostRecent.push(props.transactions.data[i])
  }
  console.log(mostRecent)

  return <div> hello from component </div>
}
export default RecentTransactions
//import props from user-home
