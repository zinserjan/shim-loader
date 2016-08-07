import path from 'path';
import fs from 'fs';
import vm from 'vm';
import assert from 'assert';
import webpack from 'webpack';

import WebpackShim from '../src/WebpackShim';


describe('Shim Test Cases', function() {
  const casesPath = path.join(__dirname, 'shimCases');
  const tmpPath = path.join('.tmp', 'shimCases');
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

      it(`should compile & work as expected`, function(done) {
        this.timeout(30000);

        const assertions = require(path.join(testDirectory, 'assert.js'));

        const shimConfig = require(path.join(testDirectory, 'config.js'));
        const shimModules = new WebpackShim(shimConfig);

        const webpackConfig = {
          context: testDirectory,
          entry: './index.js',
          // target: 'async-node',
          output: {
            path: outputDirectory,
            filename: bundleName,
            chunkFilename: `[id].${bundleName}`,
          },
          resolve: {
            alias: shimModules.alias(),
          },
          module: {
            loaders: [
              shimModules.loader()
            ]
          }
        };

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

          const bundlePath = path.join(outputDirectory, bundleName);
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

      });
    });
  });
});
