const {
    env: { NODE_ENV },
  } = process;
  const fs = require('fs');
  const path = require('path');
  const _ = require('lodash');
  
  // Get defaults
  let config = require('./default');
  
  if (NODE_ENV) {
    // Set path of file
    const file = path.resolve('config/env', `${NODE_ENV}.js`);
    // Replace defaults
    try {
      if (fs.statSync(file).isFile()) {
        config = _.defaultsDeep(require(file), config);
      }
    } catch (e) {}
  }
  
  module.exports = config;
  