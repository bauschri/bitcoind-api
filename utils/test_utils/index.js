/* eslint-disable import/no-extraneous-dependencies */
// issue here

const chai = require('chai');
const chaiSubset = require('chai-subset');
const chaiAsPromised = require('chai-as-promised');
const chaiMoment = require('chai-moment');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const superTest = require('supertest');
const { app } = require('../../app');
const logger = require('../logger');
const { config } = require('../../config');
const { initializeDB, closeConnections } = require('../../models');
const db = initializeDB(config);

let testFramework;
const initializeTestFramework = () => {
  if (testFramework) {
    return testFramework;
  }
  after(async () => {
    await closeConnections();
    logger.info('end of tests');
  });

  const request = superTest(app);
  const should = chai.should();
  const { expect } = chai;
  chai.use(chaiSubset);
  chai.use(chaiAsPromised);
  chai.use(sinonChai);
  chai.use(chaiMoment);

  async function createAuthenticatedRequest() {
    const request = superTest(app);
    return request;
  }

  testFramework = {
    db,
    chai,
    should,
    expect,
    request,
    createAuthenticatedRequest,
    sinon,
  };
  return testFramework;
};


module.exports = {
  initializeTestFramework,
};
