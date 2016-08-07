var assert = require('assert');

module.exports = function test(result) {
  assert.deepEqual(result, {
    root: '$.position',
    fn: '$.fn.position',
    ui: '$.ui.position'
  });
}
