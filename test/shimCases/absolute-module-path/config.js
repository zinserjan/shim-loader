var path = require('path');

module.exports = {
  shim: {
    // use absolute path --> no module name provided (path only)
    [path.join(__dirname, './components/identity.js')]: {
      exports: 'IDENTITY'
    }
  }
};
