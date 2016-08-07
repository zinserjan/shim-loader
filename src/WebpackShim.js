import mapKeys from 'lodash/mapKeys';
import assign from 'lodash/assign';

const loaderPath = require.resolve('./webpack/shimLoader');

const lastDollar = /\$$/;


// Ensure compatibility with CommonJS
module.exports = function WebpackShim(options) {
  const paths = options.paths || {};
  const shim = options.shim || {};

  this.alias = function alias() {
    return mapKeys(paths, (value, key) => lastDollar.test(key) ? key : `${key}$`);
  }

  this.loader = function loader(options) {
    const query = {
      shim: shim
    };

    return assign({
      test: /\.js/,
    }, options, {
      loader: loaderPath + `?${JSON.stringify(query)}`,
    });
  }
};
