var assert = require('assert');

module.exports = function test(result) {
  assert.strictEqual(typeof result, 'function');
  assert.strictEqual(result('identity'), 'identity');
  assert.strictEqual(result('identity2'), 'identity2');
}
