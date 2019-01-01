const walkSync = require('walk-sync');
const epilogue = require('epilogue');

// const log = require('../utils/logger');

function epilogueErrorHandler(req, res, err) {
  console.log(`[epilogue-error] status=${err.status} message=${err.message}`, {
    status: err.status, message: err.message, errors: err.errors,
  });
  res.status(err.status);
  res.json({
    message: err.message,
    errors: err.errors,
  });
}


module.exports = ({ app, config, db }) => {
  epilogue.initialize({
    app,
    sequelize: db.sequelize,
    base: '/api',
  });

  const epilogueResources = {};

  walkSync(__dirname, {
    globs: ['**/*.route.js'],
  }).forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require
    require(`./${file}`)({
      app, config, db, epilogue, epilogueResources,
    });
  });

  Object.keys(epilogueResources).forEach((key) => {
    epilogueResources[key].controllers.create.error = epilogueErrorHandler;
    epilogueResources[key].controllers.read.error = epilogueErrorHandler;
    epilogueResources[key].controllers.update.error = epilogueErrorHandler;
    epilogueResources[key].controllers.delete.error = epilogueErrorHandler;
    epilogueResources[key].controllers.list.error = epilogueErrorHandler;
  });

  return epilogueResources;
};
