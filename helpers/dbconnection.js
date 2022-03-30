const mongoose = require('mongoose');

function connect() {
  mongoose.connect("mongodb+srv://ArinModi:nbuPEccgqcJlZS4P@cluster0.8c4lw.mongodb.net", {
    useNewUrlParser: true,
    dbName: 'Award_Voting_System',
  });

  mongoose.Promise = Promise;

  // Database connection events
  // When successfully connected
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open for worker ${process.pid}`);
  });

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose default connection error: ${err}`);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose default connection disconnected for worker ${process.pid}`);
  });

  // If the Node process ends, close the Mongoose and Redis connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      // eslint-disable-next-line no-process-exit
      process.exit();
    });
  });
}

module.exports = connect();
