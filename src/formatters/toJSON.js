const stringifyValue = (obj, fullName) => {
  const getBeforeValue = {
    changed: obj.beforeValue,
    unchanged: obj.value,
    added: '',
    removed: obj.value,
  };

  const getAfterValue = {
    changed: obj.afterValue,
    unchanged: obj.value,
    added: obj.value,
    removed: '',
  };

  return {
    name: fullName,
    status: obj.type,
    before: getBeforeValue[obj.type],
    after: getAfterValue[obj.type],
  };
};

export default (ast) => {
  const iter = (obj, acc, parent) => (obj.type === 'grouped'
    ? [...acc, ...obj.children.reduce((iAcc, el) => iter(el, iAcc, `${parent}${obj.name}.`), [])]
    : [...acc, stringifyValue(obj, `${parent}${obj.name}`)]);

  return JSON.stringify([...ast.reduce((acc, obj) => iter(obj, acc, ''), [])]);
};
