var path = require('path');

module.exports = {
  paths: {
    'non-cjs': path.join(__dirname, './components/non-cjs.js'),
  },
  shim: {
    'non-cjs': {
      exports: 'Ember'
    },
  }
};
