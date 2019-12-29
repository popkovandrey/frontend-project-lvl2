import _ from 'lodash';

const listTypes = [
  {
    type: 'grouped',
    checkType: (first, second, key) => (_.isObject(first[key]) && _.isObject(second[key])),
    processing: (first, second, fun) => fun(first, second),
  },
  {
    type: 'added',
    checkType: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    processing: (first, second) => _.identity(second),
  },
  {
    type: 'removed',
    checkType: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    processing: (first) => _.identity(first),
  },
  {
    type: 'changed',
    checkType: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    processing: (first, second) => ({ before: first, after: second }),
  },
  {
    type: 'unchanged',
    checkType: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    processing: (first) => _.identity(first),
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

    const mappingNode = {
      grouped: { name: key, type, children: resultProc },
      added: { name: key, type, value: resultProc },
      removed: { name: key, type, value: resultProc },
      changed: {
        name: key,
        type,
        beforeValue: resultProc.before,
        afterValue: resultProc.after,
      },
      unchanged: { name: key, type, value: resultProc },
    };


    return mappingNode[type];
  });

export default buildDiffAST;
