const stringifyValue = (obj) => {
  const prefix = `Property '${obj.fullName}' was `;

  let beforeValue = obj.before;

  if (obj.before instanceof Object) {
    beforeValue = '[complex value]';
  } else if (typeof obj.before === 'string') {
    beforeValue = `'${obj.before}'`;
  }

  let afterValue = obj.after;

  if (obj.after instanceof Object) {
    afterValue = '[complex value]';
  } else if (typeof obj.after === 'string') {
    afterValue = `'${obj.after}'`;
  }

  let postfix = '';
  switch (obj.type) {
    case 'removed':
      postfix = 'removed';
      break;
    case 'unchanged':
      postfix = 'not changed';
      break;
    case 'added':
      postfix = `added with value: ${afterValue}`;
      break;
    case 'changed':
      postfix = `updated. From ${beforeValue} to ${afterValue}`;
      break;
    default:
      break;
  }

  return [`${prefix}${postfix}`];
};

export default (ast) => {
  const iter = (obj, acc) => (obj.children instanceof Array
    ? [...acc, ...obj.children.reduce((iAcc, el) => iter(el, iAcc), [])]
    : [...acc, stringifyValue(obj)]);

  return [...ast.reduce((acc, obj) => iter(obj, acc), [])].join('\n');
};
