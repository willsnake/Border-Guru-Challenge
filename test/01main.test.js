require('dotenv').config();
const request = require('supertest');
const app = require('../server');
const appInfo = require('../package.json');

describe('Application', () => {
  it('should run a server instance', async done => {
    const res = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);
    const { version } = res.body;
    expect(version).toBe(appInfo.version);
    done();
  });
});
