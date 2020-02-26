const BuyMessage = props => {
  if (props.buySuccess === '') return null
  if (props.buySuccess === 'Not Enough') {
    return "You don't have enough in your account to complete this transaction."
  }
  if (props.buySuccess === 'Purchased') {
    return 'Purchase Successful!'
  }
}
export default BuyMessage
