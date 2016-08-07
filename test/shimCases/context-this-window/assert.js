var assert = require('assert');

module.exports = function test(jquery) {
  assert.strictEqual(jquery.fn.jquery, '1.8.3');
}
