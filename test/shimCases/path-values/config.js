var path = require('path');

module.exports = {
  paths: {
    identity: path.join(__dirname, './components/identity.js'),
    identity2$: path.join(__dirname, './components/identity2.js'),
  },
  shim: {
    identity: {
      exports: 'IDENTITY'
    },
    identity2: {
      exports: 'IDENTITY2'
    }
  }
};
