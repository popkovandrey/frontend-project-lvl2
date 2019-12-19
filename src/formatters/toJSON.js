const stringifyValue = (obj) => ({
  name: obj.fullName,
  status: obj.type,
  before: obj.before,
  after: obj.after,
});

export default (ast) => {
  const iter = (obj, acc) => (obj.children instanceof Array
    ? [...acc, ...obj.children.reduce((iAcc, el) => iter(el, iAcc), [])]
    : [...acc, stringifyValue(obj)]);

  return JSON.stringify([...ast.reduce((acc, obj) => iter(obj, acc, ''), [])]);
};
