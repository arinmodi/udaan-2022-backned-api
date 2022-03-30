const express = require("express");
const cors = require('cors');
const { errorHandler } = require("./helpers/errors");
const app = express();
require("./helpers/dbconnection");
const routes = require('./routes');

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// error handler
app.use(errorHandler);

// Use routes
app.use('/', routes);

// Home route
app.get('/', (_req, res) => {
    res.status(200).json({ message: 'Hello There!! You are at BVM Award Voting System Backend...' });
});

// Error handling middleware
app.use(errorHandler);

// handle the error safely
process.on('uncaughtException', (err) => {
  console.log(err);
});

module.exports = app;