import mongoose, { ConnectOptions } from 'mongoose';

import Logger from '@system/utils/logger';
import CONFIG from '@system/configs';

const logger = Logger.child({ module: 'mongoose.ts' });
// Build the connection string
var dbURI = 'mongodb://localhost/books';

mongoose.set('useCreateIndex', true);

const options: ConnectOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  keepAlive: true,
  ...(CONFIG.API_ENV === 'local' && {
    logger: Logger.mongoLogger,
    loggerLevel: 'debug',
  }),
};

// Create the database connection
mongoose.connect(dbURI, options);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  logger.info(`Mongoose default connection open to ' + ${dbURI}`);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  logger.error(`'Mongoose default connection error: ' + ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    logger.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

const db = mongoose.connection;

export default db;
