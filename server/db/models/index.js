const User = require('./user')
const Transactions = require('./transactions')

User.hasMany(Transactions)

module.exports = {
  Transactions,
  User
}
