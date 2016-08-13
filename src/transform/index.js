import { ConcatSource, OriginalSource, RawSource, SourceMapSource } from 'webpack-sources';

import bindCode from './bindCode';
import moduleExport from './moduleExport';
import provideDependencies from './provideDependencies';
import determineShimOptions from './determineShimOptions';


export default function transform(requestedModule, code, sourcemap, file, shimConfig) {

  const { deps, exported, context, module, require, define } = determineShimOptions(requestedModule, shimConfig);

  const moduleDependencies = provideDependencies(deps);
  const moduleExported = typeof exported !== 'undefined' ? moduleExport(exported) : '';
  const wrapper = bindCode(context, module, module, require, define, !!moduleExported);

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
