const NODE_ENV = process.env.NODE_ENV || 'development';
let config = require('./config_server.json');

config = Object.assign({}, config[NODE_ENV], { environment: NODE_ENV });
console.log('process', process.env);
config.db.host = process.env.DB_HOST || config.db.host;
config.db.username = process.env.DB_USERNAME || config.db.username;
config.db.password = process.env.DB_PASSWORD || config.db.password;
config.quandlApiKey = process.env.QUANDL_API_KEY || config.quandlApiKey;

config = Object.freeze(config);

module.exports = config;
