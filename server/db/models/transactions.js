const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transactions', {
  ticket: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  amount: {
    type: Sequelize.FLOAT
  }
})

module.exports = Transactions
