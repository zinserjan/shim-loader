
(function init(glob) {

 // this horrible case of nested ternaries came straight from: https://github.com/mhemesath/r2d3/blob/master/r2d3.v2.js#L222
  (typeof module != "undefined" && module.exports)
    ? (module.exports = 'commonjs')
    : (typeof define != "undefined"
      ? (define("eve", [], function() { return 'amd'; }))
      : (glob.value = 'global'));
})(this);
