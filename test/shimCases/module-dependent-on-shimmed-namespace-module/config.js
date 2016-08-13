var path = require('path');

module.exports = {
  paths: {
    'Namespace.Core': path.join(__dirname, './components/Core.js'),
    'Namespace.AbstractWidget': path.join(__dirname, './components/AbstractWidget.js'),
    'Namespace.TextWidget': path.join(__dirname, './components/TextWidget.js'),
  },
  shim: {
    'Namespace.Core': {
      exports: 'Namespace',
    },
    'Namespace.AbstractWidget': {
      exports: 'Namespace.AbstractWidget',
      deps: ['Namespace.Core:Namespace'],
    },
    'Namespace.TextWidget': {
      exports: 'Namespace.TextWidget',
      deps: ['Namespace.Core:Namespace', 'Namespace.AbstractWidget'],
    }
  }
};
