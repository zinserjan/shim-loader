import { shimRequire } from './constant';


export default function bindWindowWithoutExports() {

  return {
    header: `\n(function webpackShim(define) {\n\n`,
    footer: `\n\n}).call(global, undefined);\n`,
  }

}
