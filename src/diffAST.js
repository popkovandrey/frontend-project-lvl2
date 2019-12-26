import _ from 'lodash';

const listTypes = [
  {
    type: 'grouped',
    checkType: (first, second, key) => (_.isObject(first[key]) && _.isObject(second[key])),
    getChildren: (first, second, parentName, fun) => fun(first, second, parentName),
  },
  {
    type: 'added',
    checkType: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    getChildren: (first, second) => _.identity(second),
  },
  {
    type: 'removed',
    checkType: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    getChildren: (first) => _.identity(first),
  },
  {
    type: 'changed',
    checkType: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    getChildren: (first, second) => ({ before: first, after: second }),
  },
  {
    type: 'unchanged',
    checkType: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    getChildren: (first) => _.identity(first),
  },
];

const buildDiffAST = (parsedData1, parsedData2, parentName = '') => _.union(Object.keys(parsedData1), Object.keys(parsedData2))
  .sort()
  .map((key) => {
    const { type, getChildren } = _.find(
      listTypes,
      (item) => item.checkType(parsedData1, parsedData2, key),
    );

    const value = getChildren(parsedData1[key], parsedData2[key], `${parentName}${key}.`, buildDiffAST);

    return {
      name: key, fullName: `${parentName}${key}`, type, value,
    };
  });

export default buildDiffAST;
