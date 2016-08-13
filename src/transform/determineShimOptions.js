import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import precond from 'precond';

export default function determineShimOptions(moduleFile, shimConfig) {
  precond.checkIsString(moduleFile, `Module name/file must be an string`);
  precond.checkIsObject(shimConfig, `Shimconfig for module '${moduleFile}' must be an object`);

  let { exports: exported, deps, commonjs, amd } = shimConfig;

  if (typeof exported !== 'undefined') {
      precond.checkArgument(isArray(exported) || isString(exported), `exports for module '${moduleFile}' must be an string or array of strings`);
  }

  if (typeof deps !== 'undefined') {
    precond.checkIsArray(deps, `deps for module '${moduleFile}' must be an array of strings`);
  } else {
    deps = [];
  }

  if (typeof commonjs !== 'undefined') {
    precond.checkIsBoolean(commonjs, `commonjs for module '${moduleFile}' must be an boolean`);
  }

  if (typeof amd !== 'undefined') {
    precond.checkIsBoolean(amd, `amd for module '${moduleFile}' must be an boolean`);
  }

  const module = !exported && !deps.length && typeof commonjs === 'undefined' || !!commonjs;
  const require = module;
  const define = !exported && !deps.length && typeof amd === 'undefined' || amd;

  return {
    deps,
    exported,
    context: 'global',
    module,
    require,
    define,
  };

}
