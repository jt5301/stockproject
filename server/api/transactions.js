const router = require('express').Router()
module.exports = router
const {Transactions} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const transaction = await Transactions.create({
      ticket: req.body.ticket.companyName,
      quantity: req.body.quantity,
      amount: (req.body.quantity * req.body.ticket.iexRealtimePrice).toFixed(2),
      userId: req.body.id
    })
    res.json(transaction.dataValues)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const userTransactions = await Transactions.findAll({
      where: {
        userId: userId
      }
    })
    res.json(userTransactions)
  } catch (error) {
    next(error)
  }
})
