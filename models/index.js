const path = require('path');
const Sequelize = require('sequelize');

let db;
const walkSync = require('walk-sync');
// const logger = require('../utils/logger');

// const LOG_SQL_THRESHOLD_IN_MS = process.env.LOG_SQL_THRESHOLD_IN_MS || 1000;

// function sequelizeLogFunction(query, duration) {
// const logMethod =
//  duration >= LOG_SQL_THRESHOLD_IN_MS ? logger.warn : logger.debug;
// logMethod({ message: query, duration });
// }

const initializeDB = (config) => {
  if (db) {
    return db;
  }
  db = {};
  const configDefault = {
    dialect: 'postgres',
    // logging: sequelizeLogFunction,
    dialectOptions: {
      supportBigNumbers: true,
    },
    pool: {
      maxConnections: 5,
      maxIdleTime: 30,
    },
    define: {
      underscored: true,
      underscoredAll: true,
    },
  };

  const cfg = Object.assign({}, config.db, configDefault);

  const sequelize = new Sequelize(
    cfg.database,
    cfg.username,
    cfg.password,
    cfg
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
      console.log(`   host     = ${sequelize.config.host}`);
      console.log(`   username = ${sequelize.config.username}`);
      console.log(`   database = ${sequelize.config.database}`);
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });

  walkSync(__dirname, {
    globs: ['**/*.sequelize.js'],
  }).forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};

module.exports = {
  initializeDB,
  db,
  closeConnections: async () => {
    if (db) {
      await db.sequelize.connectionManager.close();
    }
  },
};
