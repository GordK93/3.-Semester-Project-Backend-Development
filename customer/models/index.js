const Sequelize = require('sequelize')

require('dotenv').config()
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  dialectOptions:{
    options:{
      encrypt: true,
      enableArithAbort:false
    }
  }
});
const db = {}
db.sequelize = sequelize

module.exports = db