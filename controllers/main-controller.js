const versions = require('../package.json');

// We create the variable that will contain all the functions from the controller
const controller = {};

controller.home = async (ctx, next) => {
  const info = versions;
  ctx.status = 200;
  ctx.body = {
    version: info.version,
  };

  await next();
};

module.exports = controller;
