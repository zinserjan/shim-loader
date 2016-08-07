var assert = require('assert');

module.exports = function test(result, context) {
  assert.strictEqual(result, 'works');
  assert.ok(typeof context.jQuery === 'undefined', 'jQuery should not be required');
}
