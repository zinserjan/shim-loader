var assert = require('assert');

module.exports = function test(result, context) {
  assert.strictEqual(typeof result, 'function');
  assert.strictEqual(result(), 'jQuery.bridget');

  // commonjs module defintion prevents from polluting global namespace
  assert.strictEqual(typeof context.jQueryBridget, 'undefined');
}
