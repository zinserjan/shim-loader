import { shimModuleExport } from './constant';


export default function moduleExport(mod) {
  if (Array.isArray(mod)) {

    const body = mod.map((name) => {
      return `  ${name}: typeof ${name} !== "undefined" ? ${name} : global.${name}`;
    }).join(',\n');

    return [
      `${shimModuleExport}({`,
      body,
      `});`,
    ].join('\n');

  }
  return `${shimModuleExport}(typeof ${mod} !== "undefined" ? ${mod} : global.${mod});`;
}
