var path = require('path');

module.exports = {
  paths: {
    identity: path.join(__dirname, './components/identity.js'),
  },
  shim: {
    identity: {
      exports: 'IDENTITY'
    }
  }
};
