import { getCurrentRequest, parseQuery } from 'loader-utils';
import transform from './transform';

function getShim(loaderContext) {
	const query = parseQuery(loaderContext.query);
  const shim = query.shim || {};

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
module.exports = function shimLoader(code, sourcemap) {
  // cacheable loader
  this.cacheable();

  const shim = getShim(this);

  if (typeof shim !== 'undefined') {
		const file = getCurrentRequest(this);
    const result = transform(code, sourcemap, file, shim.deps, shim.exports);

		this.callback(null, result.source, result.map);
		return;
  }

	if (sourcemap) {
		this.callback(null, code, sourcemap);
		return;
	}

  return code;
};
