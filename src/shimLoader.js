import { getCurrentRequest, getOptions } from 'loader-utils';
import transform from './transform';

function getShim(loaderContext) {
  const query = Object.assign({}, getOptions(loaderContext));
  const shim = query.shim || {};

  const moduleName = loaderContext._module.rawRequest;
  const resourcePath = loaderContext.resourcePath;

  if (typeof shim[moduleName] !== 'undefined') {
    // module name, e.g jquery.ui.position
    return [moduleName, shim[moduleName]];
  } else if (typeof shim[resourcePath] !== 'undefined') {
    // absolute path to module
    return [resourcePath, shim[resourcePath]];
  }
  return undefined;
}

// Ensure compatibility with CommonJS
module.exports = function shimLoader(code, sourcemap) {
  // cacheable loader
  this.cacheable();

  const shim = getShim(this);

  if (typeof shim !== 'undefined') {
    const [requestedModule, shimConfig] = shim;
		const file = getCurrentRequest(this);
    const result = transform(requestedModule, code, sourcemap, file, shimConfig);

		this.callback(null, result.source, result.map);
		return;
  }

	if (sourcemap) {
		this.callback(null, code, sourcemap);
		return;
	}

  return code;
};
