var assert = require('assert');

module.exports = function test(result, context) {
  assert.notStrictEqual(typeof result.TextWidget, 'undefined');
  assert.strictEqual(typeof result.TextWidget.extend, 'function');

  var instance = new result.TextWidget();
  assert.strictEqual(typeof instance.init, 'function');
  assert.strictEqual(typeof instance.render, 'function');

  assert.strictEqual(instance.init(), 'TextWidget');
  assert.strictEqual(instance.render(), 'rendered');
}
