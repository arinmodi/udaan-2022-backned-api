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

// app.get('/api/get_required_data', (_req, res) => {
//   res.status(200).json({
//     lane : ["lane1", "lane2", "lane3"],
//     vehical_type : ["car","jeep","bike"],
//     journey_type : ["ac","non-ac"]
//   })
// })

// app.post('/api/add_data',(req,res) => {
//   var vehical = req.body.vehical;
//   var type = req.body.type;
//   var jt = req.body.journey;
//   var wt = req.body.wt;

//   console.log("Vehical : " , vehical);
//   console.log("type : ", type);
//   console.log("jt : ", jt);
//   console.log("wt : ", wt);

//   res.send({ message : "success"});
// })

// Error handling middleware
app.use(errorHandler);

// handle the error safely
process.on('uncaughtException', (err) => {
  console.log(err);
});

module.exports = app;