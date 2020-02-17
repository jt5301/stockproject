const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transactions', {
  ticket: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Transactions
