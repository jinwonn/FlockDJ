require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000
  },

});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to sequelize has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();

app.use(express.static('dist'));

app.get('/api/users', (req, res) => res.send({ username: 'Jai' }));

app.get('/api/rooms', (req, res) => res.send({ room: "Jai's room" }));

app.listen(8080, () => console.log('Listening on port 8080!'));
