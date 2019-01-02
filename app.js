const express = require('express');
const config = require('./config');
const app = express();
const db = require('./models').initializeDB(config);

require('./models/resources')({ app, config, db });

app.get('/test', (req, res) => {
  res.status(200).json({});
});

module.exports = { app };
