'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;
const HOST = '127.0.0.1'

app.use(express.json());
app.use(cors());

app.use('', require('./routers/static'));
app.use('', require('./routers/api/user'));

const startApp = async() => {
  app.listen(PORT, () => console.log(`start: ok, http://${HOST}:${PORT}`));
}; 
startApp();