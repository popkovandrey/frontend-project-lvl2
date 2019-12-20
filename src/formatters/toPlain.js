const stringifyValue = (obj) => {
  const checkComplex = (value) => (value instanceof Object ? '[complex value]' : value);
  const checkString = (value) => (typeof value === 'string' ? `'${value}'` : value);

  const mappingType = {
    removed: `Property '${obj.fullName}' was removed`,
    unchanged: `Property '${obj.fullName}' was not changed`,
    added: `Property '${obj.fullName}' was added with value: ${checkComplex(checkString(obj.value))}`,
    changed: `Property '${obj.fullName}' was updated. From ${checkComplex(checkString(obj.value.before))} to ${checkComplex(checkString(obj.value.after))}`,
  };

  return [mappingType[obj.type]];
};

export default (ast) => {
  const iter = (obj, acc) => (obj.type === 'grouped'
    ? [...acc, ...obj.value.reduce((iAcc, el) => iter(el, iAcc), [])]
    : [...acc, stringifyValue(obj)]);

  return [...ast.reduce((acc, obj) => iter(obj, acc), [])].join('\n');
};
