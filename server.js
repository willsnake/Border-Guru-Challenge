require('dotenv').config();
const path = require('path');
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const fs = require('fs');
const config = require('./config');

// Middlewares
const cors = require('@koa/cors');

const server = new Koa();

/** Middlewares */
server
  /** Add CORS */
  .use(cors())
  /** Enable body parsing */
  .use(bodyParser());

/** Exports server listening if module parent (jest) */
if (module.parent) {
  module.exports = server.listen();
} else {
  server.listen(config.port, () => {
    console.log('Server listening at %s', config.port);
  });
}

// Get routers
for (const controller of fs.readdirSync(path.resolve('routers'))) {
  const file = path.resolve('routers', controller);
  if (/-router.js$/.test(file) && fs.statSync(file).isFile()) {
    try {
      server.use(require(file).routes());
    } catch (e) {
      console.error(e);
    }
  }
}
