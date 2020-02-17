const router = require('express').Router()
module.exports = router
const axios = require('axios')

router.get('/', async (req, res, next) => {
  try {
    let ticket = 'XOM'
    const stock = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${ticket}/quote?token=${APIToken}`
    )
    res.send(stock.data)
  } catch (err) {
    next(err)
  }
})
