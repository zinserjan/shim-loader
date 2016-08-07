import { shimModuleExport } from './constant';


export default function bindWindowWithExports(code) {
  return [
    `(function webpackShim(module, exports, require, define, ${shimModuleExport}) {\n`,
    code,
    `\n}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });`,

  ].join('\n');
}
