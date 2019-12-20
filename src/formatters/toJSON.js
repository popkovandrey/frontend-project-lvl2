const stringifyValue = (obj) => {
  const getBeforeValue = {
    changed: obj.value.before,
    unchanged: obj.value,
    added: '',
    removed: obj.value,
  };

  const getAfterValue = {
    changed: obj.value.after,
    unchanged: obj.value,
    added: obj.value,
    removed: '',
  };

  return {
    name: obj.fullName,
    status: obj.type,
    before: getBeforeValue[obj.type],
    after: getAfterValue[obj.type],
  };
};

export default (ast) => {
  const iter = (obj, acc) => (obj.type === 'grouped'
    ? [...acc, ...obj.value.reduce((iAcc, el) => iter(el, iAcc), [])]
    : [...acc, stringifyValue(obj)]);

  return JSON.stringify([...ast.reduce((acc, obj) => iter(obj, acc), [])]);
};
