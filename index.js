const { app } = require('./app');
const logger = require('./utils/logger');
const config = require('./config/index');
const SERVICE_PORT = 4001;

const server = app.listen(SERVICE_PORT, () => {
  const host = server.address().address;
  const { port } = server.address();
  logger.info('BITCOIND-API server (%s) listening at http://%s:%s ', config.environment, host, port);
});
