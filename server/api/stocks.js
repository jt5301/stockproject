const router = require('express').Router()
module.exports = router
const axios = require('axios')

const {APIToken} = require('../../secrets')

//API Token: pk_7a84a5bbe2e04c5f8b697f491b847a33

//https://cloud.iexapis.com/
//https://cloud.iexapis.com/stable/stock/XOM/quote?token=pk_7a84a5bbe2e04c5f8b697f491b847a33

router.get('/', async (req, res, next) => {
  try {
    console.log('hello>>>>>>>>', APIToken)
    let ticket = 'XOM'
    const stock = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${ticket}/quote?token=${APIToken}`
    )
    res.send(stock.data)
  } catch (err) {
    next(err)
  }
})
