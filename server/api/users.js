const router = require('express').Router()
const {User} = require('../db/models')
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

// router.put('/:id', async (req, res, next) => {
//   try {
//     let subtractAmt = req.body.cost
//     let user = req.params.id
//     const user = await User.findByPk(user)
//     user.cash -=subtractAmt
//   } catch (error) {
//     next(err)
//   }
// })

// router.get('/:id', async (req, res, next) => {
//   try {
//     let id = req.params.id
//     let user = await User.findByPk(id)
//     res.json(user)
//   } catch (error) {
//     console.log(error)
//   }
// })
