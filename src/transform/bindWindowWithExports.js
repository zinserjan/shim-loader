import { shimModuleExport } from './constant';


export default function bindWindowWithExports(code) {

  return {
    header: `\n(function webpackShim(module, exports, require, define, ${shimModuleExport}) {\n\n`,
    footer:`\n\n}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });\n`,
  };
}
