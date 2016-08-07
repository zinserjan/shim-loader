// import { SourceNode, SourceMapConsumer, } from 'source-map';
import { ConcatSource, OriginalSource, RawSource, SourceMapSource } from 'webpack-sources';

import bindWindowWithExports from './bindWindowWithExports';
import bindWindowWithoutExports from './bindWindowWithoutExports';
import moduleExport from './moduleExport';
import provideDependencies from './provideDependencies';


export default function transform(code, sourcemap, file, deps, exported) {

  const moduleDependencies = provideDependencies(deps);
  const moduleExported = typeof exported !== 'undefined' ? moduleExport(exported) : '';
  const wrapper = moduleExported === '' ? bindWindowWithoutExports() : bindWindowWithExports();

  let map;

  const header = [
    moduleDependencies,
    wrapper.header,
    '\n'
  ].join('\n');

  const footer = [
    ';\n',
    moduleExported,
    wrapper.footer
  ].join('\n');

  const sourceHeader = new RawSource(header);
  const sourceContent = sourcemap ? new SourceMapSource(code, file, sourcemap) : new OriginalSource(code, file);
  const sourceFooter = new RawSource(footer);

  const source = new ConcatSource(sourceHeader, sourceContent, sourceFooter);

  return source.sourceAndMap();
}
