import { parseQuery } from 'loader-utils';
import transform from '../transform';

function getShim(loaderContext) {
	const query = parseQuery(loaderContext.query);
  const shim = query.shim;

  const moduleName = loaderContext._module.rawRequest;
  const resourcePath = loaderContext.resourcePath;

  if (typeof shim[moduleName] !== 'undefined') {
    // module name, e.g jquery.ui.position
    return shim[moduleName];
  } else if (typeof shim[resourcePath] !== 'undefined') {
    // absolute path to module
    return shim[resourcePath];
  }
  return undefined;
}

// Ensure compatibility with CommonJS
module.exports = function shimLoader(source) {
  // cacheable loader
  this.cacheable();

  const shim = getShim(this);

  if (typeof shim !== 'undefined') {
    const newSource = transform(source, shim.deps, shim.exports);
    return newSource;
  } else {
    return source;
  }

};
