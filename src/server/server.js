const express = require('express');
const bodyParser  = require("body-parser");


const app = express();

app.use(express.static('dist'));

app.get('/api/users', (req, res) => res.send({ username: 'Jai' }));

app.get('/api/rooms', (req, res) => res.send({ room: "Jai's room" }));

app.listen(8080, () => console.log('Listening on port 8080!'));
