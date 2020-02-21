const router = require('express').Router()
module.exports = router
const axios = require('axios')

// const { APIToken } = require('../../secrets')
const APIToken = process.env.API_TOKEN
router.get('/:id', async (req, res, next) => {
  try {
    // console.log('anything there>>>>>>>>', process.env)
    let ticket = req.params.id
    const stock = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${ticket}/quote?token=${APIToken}`
    )
    res.json(stock.data)
  } catch (err) {
    next(err)
  }
})
