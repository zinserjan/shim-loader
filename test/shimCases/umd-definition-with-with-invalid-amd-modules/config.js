var path = require('path');

module.exports = {
  paths: {
    'jquery': path.join(__dirname, './components/jquery.js'),
    'jquery-bridget': path.join(__dirname, './components/jquery-bridget.js'),
  },
  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'jquery-bridget': {
      amd: false, // just disable AMD module defintion and use CommonJS definition
    }
  }
};
