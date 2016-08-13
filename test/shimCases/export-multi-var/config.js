var path = require('path');

module.exports = {
  paths: {
    jquery: path.join(__dirname, './components/jquery.js'),
  },
  shim: {
    jquery: {
      exports: ['$', 'jQuery']
    }
  }
};
