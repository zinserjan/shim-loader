var assert = require('assert');

module.exports = function test(result) {
  assert.deepEqual(result, {
    $: '$',
    jQuery: 'jQuery',
  })
}
