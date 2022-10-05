const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  user:  process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  connectionLimit: 10
})

module.exports = pool
