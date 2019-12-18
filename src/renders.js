/* eslint no-else-return: 0 */
const leftIdent = '    ';

const stringifyValue = (depthIdent, prefix, key, value) => {
  const ident = leftIdent.repeat(depthIdent);

  return value instanceof Object
    ? [`${ident.slice(0, -2)}${prefix}${key}: {`,
      `${ident}${leftIdent}${Object.entries(value)[0][0]}: ${Object.entries(value)[0][1]}`,
      `${ident}}`]
    : [`${ident.slice(0, -2)}${prefix}${key}: ${value}`];
};

export default (ast) => {
  const iter = (obj, acc, depthIdent) => {
    if (obj.children instanceof Array) {
      return [...acc,
        `${leftIdent.repeat(depthIdent)}${obj.name}: {`,
        ...obj.children.reduce((iAcc, el) => iter(el, iAcc, depthIdent + 1), []),
        `${leftIdent.repeat(depthIdent)}}`];
    } else {
      let res;
      const key = obj.name;
      const beforeValue = obj.before;
      const afterValue = obj.after;

      switch (obj.type) {
        case 'unchanged':
          res = stringifyValue(depthIdent, '  ', key, beforeValue);
          break;
        case 'added':
          res = stringifyValue(depthIdent, '+ ', key, afterValue);
          break;
        case 'removed':
          res = stringifyValue(depthIdent, '- ', key, beforeValue);
          break;
        case 'changed':
          res = [...stringifyValue(depthIdent, '- ', key, beforeValue),
            ...stringifyValue(depthIdent, '+ ', key, afterValue)];
          break;
        default:
          break;
      }

      return [...acc, ...res];
    }
  };

  return ['{', ...ast.reduce((acc, obj) => iter(obj, acc, 1), []), '}'].join('\n');
};
