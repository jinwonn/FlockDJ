const dotenv = require('dotenv').config();

module.exports = {
  development: {
    database: 'final',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
      underscored: true
    },
  },
}

