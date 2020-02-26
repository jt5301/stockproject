const LookUpMessage = props => {
  console.log('in lookup', props)
  const quantity = props.quantity
  const validTicket = props.valid
  console.log(quantity, validTicket)
  if (!quantity || !validTicket) return ''
  if (validTicket === 'invalid ticket') {
    console.log('if test>>>>>>>>>>>>>')
  }
  switch (validTicket) {
    case 'invalid ticket':
      console.log('reached ticket')
      return 'Please enter a valid ticket.'
    case 'invalid quantity':
      console.log('reached quantity')
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
