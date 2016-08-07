var path = require('path');

module.exports = {
  paths: {
    'jquery': path.join(__dirname, './components/jquery.js'),
    'jquery.ui.position': path.join(__dirname, './components/jquery.ui.position.js'),
    'jquery.ui.tooltip': path.join(__dirname, './components/jquery.ui.tooltip.js'),
  },
  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'jquery.ui.position': {
      deps: ['jquery:jQuery'] // provide jquery module as jQuery
    },
    'jquery.ui.tooltip': {
      deps: [
        'jquery:jQuery', // provide jquery module as jQuery
        'jquery.ui.position', // just make sure position is loaded
      ]
    }
  }
};
