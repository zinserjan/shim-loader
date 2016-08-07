export default function provideDependencies(deps = []) {

  if (deps.length) {
    const code = deps.map((dep) => {
      const values = dep.split(':');
      const alias = values[0];

      const statement = `require('${alias}');`;

      if (values.length === 2) {
        const name = values[1];
        return `var ${name} = global.${name} = ${statement}`;
      }

      return statement;

    }).join('\n');

    return code;
  }
  return '';
}
