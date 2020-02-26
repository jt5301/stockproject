const LookUpMessage = props => {
  const quantity = props.quantity
  const validTicket = props.valid
  if (!validTicket) return ''
  switch (validTicket) {
    case 'invalid ticket':
      return 'Please enter a valid ticket.'
    case 'invalid quantity':
      return 'Please enter a valid quantity greater than zero.'
    default:
      return `${
        validTicket.companyName
      } is currently priced at $${validTicket.latestPrice.toFixed(
        2
      )} per share. Click the 'Buy' button to buy ${quantity} share(s).`
  }
}
export default LookUpMessage
