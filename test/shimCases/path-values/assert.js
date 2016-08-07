var assert = require('assert');

module.exports = function test(result) {
  var identity = result.identity;
  var identity2 = result.identity2;

  assert.strictEqual(typeof identity, 'function');
  assert.strictEqual(typeof identity2, 'function');

  assert.strictEqual(identity('identity'), 'identity');
  assert.strictEqual(identity('identity2'), 'identity2');

  assert.strictEqual(identity2('identity'), 'identity');
  assert.strictEqual(identity2('identity2'), 'identity2');
}
