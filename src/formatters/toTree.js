const leftIdent = '    ';

const prepareValue = (name, value, ident, prefix) => {
  if (value instanceof Object) {
    return [`${ident.slice(0, -2)}${prefix}${name}: {`,
      `${ident}${leftIdent}${Object.keys(value)[0]}: ${Object.values(value)[0]}`,
      `${ident}}`];
  }

  return [`${ident.slice(0, -2)}${prefix}${name}: ${value}`];
};

const stringifyValue = (obj, depthIdent) => {
  const ident = leftIdent.repeat(depthIdent);

  const mappingType = {
    unchanged: prepareValue(obj.name, obj.value, ident, '  '),
    added: prepareValue(obj.name, obj.value, ident, '+ '),
    removed: prepareValue(obj.name, obj.value, ident, '- '),
    changed: [
      ...prepareValue(obj.name, obj.value.before, ident, '- '),
      ...prepareValue(obj.name, obj.value.after, ident, '+ ')],
  };

  return mappingType[obj.type];
};

export default (ast) => {
  const iter = (obj, acc, depthIdent) => (obj.type === 'grouped'
    ? [...acc,
      `${leftIdent.repeat(depthIdent)}${obj.name}: {`,
      ...obj.children.reduce((iAcc, el) => iter(el, iAcc, depthIdent + 1), []),
      `${leftIdent.repeat(depthIdent)}}`]
    : [...acc, ...stringifyValue(obj, depthIdent)]);

  return ['{', ...ast.reduce((acc, obj) => iter(obj, acc, 1), []), '}'].join('\n');
};
