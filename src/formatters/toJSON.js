const stringifyValue = (obj, fullName) => (
  {
    name: fullName,
    type: obj.type,
    value: obj.value,
  }
);

export default (ast) => {
  const iter = (obj, acc, parent) => (obj.type === 'grouped'
    ? [...acc, ...obj.children.reduce((iAcc, el) => iter(el, iAcc, `${parent}${obj.name}.`), [])]
    : [...acc, stringifyValue(obj, `${parent}${obj.name}`)]);

  return JSON.stringify([...ast.reduce((acc, obj) => iter(obj, acc, ''), [])]);
};
