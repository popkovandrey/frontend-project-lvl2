import _ from 'lodash';

const listTypes = [
  {
    type: 'grouped',
    checkType: (first, second, key) => (_.isObject(first[key]) && _.isObject(second[key])),
    processing: (first, second, fun) => ({ children: fun(first, second) }),
  },
  {
    type: 'added',
    checkType: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    processing: (first, second) => ({ value: second }),
  },
  {
    type: 'removed',
    checkType: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    processing: (first) => ({ value: first }),
  },
  {
    type: 'changed',
    checkType: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    processing: (first, second) => ({ oldValue: first, newValue: second }),
  },
  {
    type: 'unchanged',
    checkType: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    processing: (first) => ({ value: first }),
  },
];

const buildDiffAST = (parsedData1, parsedData2) => _.union(
  Object.keys(parsedData1),
  Object.keys(parsedData2),
)
  .sort()
  .map((key) => {
    const { type, processing } = _.find(
      listTypes,
      (item) => item.checkType(parsedData1, parsedData2, key),
    );

    const resultProc = processing(parsedData1[key], parsedData2[key], buildDiffAST);

    return { name: key, type, ...resultProc };
  });

export default buildDiffAST;
