const router = require('express').Router()
const {User} = require('../db/models/index')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'cash']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/buy/:id', async (req, res, next) => {
  try {
    let subtractAmt = req.body.data
    let userId = req.params.id
    let user = await User.findByPk(userId)
    user.cash -= subtractAmt
    await user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
})
