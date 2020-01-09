const stringifyValue = (obj, fullName) => {
  const checkComplex = (value) => (value instanceof Object ? '[complex value]' : value);
  const checkString = (value) => (typeof value === 'string' ? `'${value}'` : value);

  const mappingType = {
    removed: `Property '${fullName}' was removed`,
    unchanged: `Property '${fullName}' was not changed`,
    added: `Property '${fullName}' was added with value: ${checkComplex(checkString(obj.value))}`,
    changed: `Property '${fullName}' was updated. From ${checkComplex(checkString(obj.value.before))} to ${checkComplex(checkString(obj.value.after))}`,
  };

  return [mappingType[obj.type]];
};

export default (ast) => {
  const iter = (obj, acc, parent) => (obj.type === 'grouped'
    ? [...acc, ...obj.children.reduce((iAcc, el) => iter(el, iAcc, `${parent}${obj.name}.`), [])]
    : [...acc, stringifyValue(obj, `${parent}${obj.name}`)]);

  return [...ast.reduce((acc, obj) => iter(obj, acc, ''), [])].join('\n');
};
