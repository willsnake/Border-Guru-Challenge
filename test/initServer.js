const agent = require('supertest');
const server = require('../server');

module.exports = function initServer() {
  return {
    server,
    agent: agent(process.env.TEST_URL || server.listen()),
    fixtures: {},
  };
};
