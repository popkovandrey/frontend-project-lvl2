const leftIndent = '    ';

const stringifyValue = (name, value, indent, prefix) => {
  if (typeof value !== 'object') {
    return `${indent.slice(0, -2)}${prefix}${name}: ${value}`;
  }

  return [`${indent.slice(0, -2)}${prefix}${name}: {`,
    `${indent}${leftIndent}${Object.keys(value)[0]}: ${Object.values(value)[0]}`,
    `${indent}}`].join('\n');
};

const valueIndent = (depth) => leftIndent.repeat(depth);

const mappingNodeType = {
  unchanged: ({ name, value }, depth) => stringifyValue(name, value, valueIndent(depth), '  '),
  added: ({ name, value }, depth) => stringifyValue(name, value, valueIndent(depth), '+ '),
  removed: ({ name, value }, depth) => stringifyValue(name, value, valueIndent(depth), '- '),
  changed: ({ name, oldValue, newValue }, depth) => ([
    stringifyValue(name, oldValue, valueIndent(depth), '- '),
    stringifyValue(name, newValue, valueIndent(depth), '+ ')].join('\n')),
  grouped: ({ name, children }, depth, func) => [`${valueIndent(depth)}${name}: {`,
    func(children, depth + 1),
    `${valueIndent(depth)}}`].join('\n'),
};

export default (ast) => {
  const iter = (data, depth = 1) => data.map((node) => {
    const output = mappingNodeType[node.type];

    return output(node, depth, iter);
  }).join('\n');

  return ['{', iter(ast), '}'].join('\n');
};
