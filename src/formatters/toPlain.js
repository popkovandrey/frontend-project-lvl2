const mappingTypeValue = {
  string: (value) => `'${value}'`,
  boolean: (value) => value,
  number: (value) => value,
  object: () => '[complex value]',
};

const getValue = (value) => mappingTypeValue[(typeof value)](value);

const mappingNodeType = {
  removed: ({ name }) => `Property '${name}' was removed`,
  unchanged: ({ name }) => `Property '${name}' was not changed`,
  added: ({ name, value }) => `Property '${name}' was added with value: ${getValue(value)}`,
  changed: ({ name, oldValue, newValue }) => `Property '${name}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`,
  grouped: ({ name, children }, func) => func(children, `${name}.`),
};

export default (ast) => {
  const iter = (data, parent = '') => data.map((node) => {
    const output = mappingNodeType[node.type];

    const fullName = `${parent}${node.name}`;

    return output({ ...node, name: fullName }, iter);
  }).join('\n');

  return iter(ast);
};
