const mongoose = require('mongoose');

mongoose.Promise = Promise;
let connection;

module.exports = {
  getConnection: config => {
    const { user, password, host, port, db } = config;
    if (!port || !host || !db) {
      throw new Error('Required database attributes missed.');
    }
    if (!connection) {
      const uri = `mongodb://${host}:${port}/${db}`;
      const options = user ? { user: user, pass: password, useNewUrlParser: true } : { useNewUrlParser: true };
      mongoose.connect(
        uri,
        options,
      );
      connection = mongoose.connection;
      connection.on('error', err => {
        console.log('MongoDB Error: ', err);
      });
      connection.once('open', () => {
        console.log('MongoDB connected');
      });
    }
    return connection;
  },
};
