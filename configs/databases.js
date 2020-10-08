const mysql = require("mysql2"),
  config = require("../configs/app")

const databases = {
  mongoDB() {},

  mysql() {
    const pool = mysql.createPool({
      host: config.dbHostname,
      user: config.dbUsername,
      password: config.dbPassword,
      database: config.dbDatabase,
      charset: "utf8",
      connectionLimit: 100,
    })
    const promisePool = pool.promise()
    return promisePool
  },

  postgresql() {},

  mssql() {},
}

module.exports = databases.mysql()
