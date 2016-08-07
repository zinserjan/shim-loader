// Some modules require other modules that they haven't even installed (trying to be commonJS compliant the wrong way)

var jQuery;

// we will need to reassign the require (after we did our require calls to get depends)
// therefore we'll add `require = undefined` above the code of this module
if (!jQuery && typeof require === 'function') {
  // webpack will not try to 'jquery' now, cause we set require to undefined
  jQuery = require('jquery');
}

window.Ember = 'works';
