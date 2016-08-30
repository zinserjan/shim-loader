# shim-loader [![npm package][npm-badge]][npm] [![Build Status][build-badge]][build] [![codecov][codecov-badge]][codecov]

shim-loader makes traditional/legacy "browser globals" scripts compatible with webpack's module system. Based on the idea of [RequireJS](http://requirejs.org/docs/api.html#config-shim) and [browserify-shim](https://github.com/thlorenz/browserify-shim).

Shimming in webpack is already possible with [complicated configurations](https://github.com/webpack/docs/wiki/shimming-modules). Now it's easy!


## Features

  - Shims non-CommonJS modules by specifying an alias and the identifier under which the module attaches itself to the global window object. Optionally you can specify the path to the module.
  - set up code relationships when libraries depends on other libraries being in the global namespace.
  - Makes *define* and also *module* be undefined, in order to fix improperly-authored libraries that need shimming but try anyway to use AMD or CommonJS.

## When should I use this?
You should use this only when you have to use libraries that are incompatible with your desired module definition style or when you want to upgrade a legacy project to the present.

## How does it work?
shim-loader is a webpack loader that transforms the code in a way that it works in the webpack environment. It's nearly the same as doing this manually with [imports-loader](https://github.com/webpack/imports-loader) and [exports-loader](https://github.com/webpack/exports-loader).

## Installation

```bash

$ npm install shim-loader --save-dev

```
Install shim-loader via npm and add the loader to your webpack config.


## Configuration


**webpack.config.js**
```javascript

var path = require('path');

var webpackShimConfig = {
  // Remember: Only use shim config for incompatible libraries
  // the libraries below are just examples, regardless whether they are compatible or not
  shim: {
    'jquery': {
      exports: 'jQuery' // Once loaded, use the global 'jQuery' as the module value.
    },
    'underscore': {
      exports: '_' // Once loaded, use the global '_' as the module value.
    },
    'backbone': {
      exports: 'Backbone' // Once loaded, use the global 'Backbone' as the module value.
      deps: [
        'underscore', // just make sure that underscore is loaded before (uses it's global value)
        'jquery:$', // Provide jquery as dependency with name $
      ]
    },
    'jquery.ui.core': {
      deps: [
        'jquery:jQuery', // Provide jquery as dependency with name jQuery
      ]
    },
    'jquery.ui.datepicker': {
      deps: [
        'jquery:jQuery', // Provide jquery as dependency with name jQuery
        'jquery.ui.core', // just make sure that jquery.ui.core is loaded before
      ]
    },
    'math': {
      // multiple export values are also possible,
      // they are returned as single object with the associated key for each value
      // e.g. module.exports = { add: function(){}, subtract: function(){} };
      exports: [
        'add', // exports add from global namespace as module value
        'subtract',  // exports subtract from global namespace as module value
      ]
    },
    // absolute paths are also possible
    [path.join(__dirname, 'bower_components/jquery-ui/ui/datepicker.js')]: {
      deps: [
          'jquery:jQuery', // Provide jquery as dependency with name jQuery
          'jquery.ui.core', // just make sure that jquery.ui.core is loaded before
        ]
    }
  },
  'masonry': {
      amd: false // disable AMD module style
      commonjs: true // and use CommonJS module style instead
  }
};

module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      'jquery': path.join(__dirname, 'bower_components/jquery/dist/jquery.js'),
      'underscore': path.join(__dirname, 'bower_components/lodash/dist/lodash.underscore.js'),
      'backbone': path.join(__dirname, 'bower_components/backbone/backbone.js'),
      'jquery.ui.core': path.join(__dirname, 'bower_components/jquery-ui/ui/core.js'),
      'jquery.ui.datepicker': path.join(__dirname, 'bower_components/jquery-ui/ui/datepicker.js'),
    },
  },
  module: {
    loaders: [
      {
        // apply the loader to setup module shimming
        test: /\.js/
        loader: 'shim-loader',
        query: webpackShimConfig,
        // pass a list of directories or files to improve performance
        includes:  path.join(__dirname, 'bower_components'),
      }
    ]
  },
};

```

## License

MIT


[npm-badge]: https://img.shields.io/npm/v/shim-loader.svg?style=flat-square
[npm]: https://www.npmjs.org/package/shim-loader
[build-badge]:https://travis-ci.org/zinserjan/shim-loader.svg?branch=master
[build]: https://travis-ci.org/zinserjan/shim-loader
[codecov-badge]:https://codecov.io/gh/zinserjan/shim-loader/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/zinserjan/shim-loader
