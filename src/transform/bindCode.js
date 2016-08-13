import { shimModuleExport } from './constant';

function conditionalPush(array, condition, value, alternate) {
  if (condition) {
    array.push(value);
  } else {
    array.push(alternate);
  }
}

export default function bindCode(context, moduleEnabled, exportsEnabled, requireEnabled, defineEnabled, exportsVar) {
  const functionArguments = []
  const callArguments = [context];

  functionArguments.push('module');
  conditionalPush(callArguments, moduleEnabled, 'module', 'undefined');

  functionArguments.push('exports');
  conditionalPush(callArguments, exportsEnabled, 'exports', 'undefined');

  functionArguments.push('require');
  conditionalPush(callArguments, requireEnabled, 'require', 'undefined');

  functionArguments.push('define');
  conditionalPush(callArguments, defineEnabled, 'define', 'undefined');

  if (exportsVar) {
    functionArguments.push(shimModuleExport);
    callArguments.push('function defineExport(ex) { module.exports = ex; }');
  }

  return {
    header: `\n(function webpackShim(${functionArguments.join(', ')}) {\n\n`,
    footer:`\n\n}).call(${callArguments.join(', ')});\n`,
  };
}
