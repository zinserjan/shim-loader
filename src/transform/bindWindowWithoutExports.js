import { shimRequire } from './constant';


export default function bindWindowWithoutExports(code) {
  return [
    `(function webpackShim(define) {\n`,
    code,
    `\n}).call(global, undefined);`,

  ].join('\n');
}
