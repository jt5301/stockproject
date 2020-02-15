const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transactions', {
  Ticket: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Transactions
