var path = require('path');

module.exports = {
  paths: {
    'lodash-identity': path.join(__dirname, './components/lodash-identity.js'),
  },
  shim: {
    'lodash-identity': {
      deps: ['lodash:_'], // provide lodash module as var  _
      commonjs: true, // allow commonjs module style
    }
  }
};
