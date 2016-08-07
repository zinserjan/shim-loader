var path = require('path');

module.exports = {
  paths: {
    value: path.join(__dirname, './components/value.js'),
  },
  shim: {
    value: {
      exports: 'value'
    }
  }
};
