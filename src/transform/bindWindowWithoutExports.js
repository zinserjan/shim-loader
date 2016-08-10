import { shimRequire } from './constant';


export default function bindWindowWithoutExports() {
  // if a module doesn't need anything to be exported, it is likely, that it exports itself properly
  // therefore it is not a good idea to override the module here, however we need to still disable require,

  return {
    header: `\n(function webpackShim(module, define, require) {\n\n`,
    footer: `\n\n}).call(global, module, undefined, undefined);\n`,
  }

}
