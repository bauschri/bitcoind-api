const secureEnv = require('secure-env');
const NODE_ENV = process.env.NODE_ENV || 'development';
let config = require('./config_server.json');

const enc = secureEnv({ secret: process.env.APP_SECRET });

config = Object.assign({}, config[NODE_ENV], { environment: NODE_ENV });

config.db.host = process.env.DB_HOST || enc.DB_HOST || config.db.host;
config.db.username = process.env.DB_USERNAME || enc.DB_USERNAME || config.db.username;
config.db.password = process.env.DB_PASSWORD || enc.DB_PASSWORD || config.db.password;
config.quandlApiKey = process.env.QUANDL_API_KEY || enc.QUANDL_API_KEY || config.quandlApiKey;

config = Object.freeze(config);
console.log('config', config);

module.exports = config;
