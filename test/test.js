import path from 'path';
import fs from 'fs';
import vm from 'vm';
import assert from 'assert';
import webpack from 'webpack';

const shimLoaderPath = require.resolve('../src/shimLoader');


function testWebpack(webpackConfig, bundlePath, assertions, done) {
  webpack(webpackConfig, function(err, stats) {
    if (err) {
      return done(err);
    }

    const jsonStats = stats.toJson({colors: true});
    if (jsonStats.errors.length > 0 || jsonStats.warnings.length > 0) {
      console.log(stats.toString({
        colors: true,
      }));
    }

    const exists = fs.existsSync(bundlePath);

    assert.ok(exists, 'Compiled bundle should exist');

    const code = fs.readFileSync(bundlePath, 'utf-8');

    const ctx = {
      window: {},
      console: console
    };
    ctx.self = ctx.window;
    ctx.window = ctx;

    const fn = vm.runInNewContext(code, ctx);

    assertions(fn, ctx);

    // give a free pass to compilation that generated an error
    process.nextTick(done);
  });
}


describe('Shim Test Cases', function() {
  const casesPath = path.join(__dirname, 'shimCases');
  const tmpPath = path.resolve('.tmp', 'shimCases');
  const bundleName = 'bundle.js';


  const testCases = fs.readdirSync(casesPath).map((test) => {
    return {
      name: test,
      path: path.join(casesPath, test),
      output: path.join(tmpPath, test),
    };
  });

  testCases.forEach(function(testCase) {
    const testDirectory = testCase.path;
    const outputDirectory = testCase.output;


    describe(testCase.name, function() {

      const assertions = require(path.join(testDirectory, 'assert.js'));

      const shimConfig = require(path.join(testDirectory, 'config.js'));

      it(`should compile & work as expected (no devtool)`, function(done) {
        this.timeout(30000);

        const outputPath = path.join(outputDirectory, 'no-devtool');

        const bundlePath = path.join(outputPath, bundleName);

        const webpackConfig = {
          context: testDirectory,
          entry: './index.js',
          // target: 'async-node',
          output: {
            path: outputPath,
            filename: bundleName,
            chunkFilename: `[id].${bundleName}`,
          },
          resolve: {
            alias: shimConfig.paths,
          },
          module: {
            loaders: [
              {
                test: /\.js/,
                loader: shimLoaderPath,
                query: shimConfig,
              }
            ]
          }
        };

        testWebpack(webpackConfig, bundlePath, assertions, done);

      });

      it(`should compile & work as expected (with sourcemap)`, function(done) {
        this.timeout(30000);

        const outputPath = path.join(outputDirectory, 'devtool-sourcemap');

        const bundlePath = path.join(outputPath, bundleName);

        const webpackConfig = {
          context: testDirectory,
          entry: './index.js',
          // target: 'async-node',
          output: {
            path: outputPath,
            filename: bundleName,
            chunkFilename: `[id].${bundleName}`,
          },
          resolve: {
            alias: shimConfig.paths,
          },
          module: {
            loaders: [
              {
                test: /\.js/,
                loader: shimLoaderPath,
                query: shimConfig,
              }
            ]
          },
          devtool: '#source-map',
        };

        testWebpack(webpackConfig, bundlePath, assertions, done);

      });

      it(`should compile & work as expected (with loader & devtool source-map)`, function(done) {
        this.timeout(30000);

        const outputPath = path.join(outputDirectory, 'devtool-source-map-with-loader');
        const bundlePath = path.join(outputPath, bundleName);

        const webpackConfig = {
          context: testDirectory,
          entry: './index.js',
          // target: 'async-node',
          output: {
            path: outputPath,
            filename: bundleName,
            chunkFilename: `[id].${bundleName}`,
          },
          resolve: {
            alias: shimConfig.paths,
          },
          module: {
            loaders: [
              {
                test: /\.js/,
                loader: shimLoaderPath,
                query: shimConfig,
              },
              {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                  babelrc: false,
                  presets: ['es2015-script'] // in order to run tests
                }
              }
            ]
          },
          devtool: '#source-map',
        };

        testWebpack(webpackConfig, bundlePath, assertions, done);
      });
    });
  });
});
