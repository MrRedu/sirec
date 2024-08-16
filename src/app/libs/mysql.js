import mysql from 'mysql2/promise'

// #TODO: Magic strings (?)
export const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: '3306',
  database: 'db_sirec',
})
