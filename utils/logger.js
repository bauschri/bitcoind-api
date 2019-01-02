const winston = require('winston');
const config = require('../config/index');
const consoleOptions = {
  name: 'consoleLogs',
  level: config.LOG_LEVEL,
  handleExceptions: false,
  colorize: true,
  timestamp: true,
};

winston.remove(winston.transports.Console);
const winstonLogger = winston.add(winston.transports.Console, consoleOptions);
winstonLogger.exitOnError = false;

module.exports = winstonLogger;
