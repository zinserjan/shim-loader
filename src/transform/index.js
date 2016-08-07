import bindWindowWithExports from './bindWindowWithExports';
import bindWindowWithoutExports from './bindWindowWithoutExports';
import moduleExport from './moduleExport';
import provideDependencies from './provideDependencies';


export default function transform(code, deps, exported) {

  const moduleDependencies = provideDependencies(deps);
  const moduleExported = typeof exported !== 'undefined' ? moduleExport(exported) : '';
  const content = `${code};${moduleExported}`;
  const wrapped = moduleExported === '' ? bindWindowWithoutExports(content) : bindWindowWithExports(content);

  return [
    moduleDependencies,
    wrapped
  ].join(';\n');
}
