import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const listTypes = [
  {
    type: 'grouped',
    checkType: (first, second, key) => (_.isObject(first[key]) && _.isObject(second[key])),
    getValue: (first, second, parentName, fun) => fun(first, second, parentName),
  },
  {
    type: 'added',
    checkType: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    getValue: (first, second) => _.identity(second),
  },
  {
    type: 'removed',
    checkType: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    getValue: (first) => _.identity(first),
  },
  {
    type: 'changed',
    checkType: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    getValue: (first, second) => ({ before: first, after: second }),
  },
  {
    type: 'unchanged',
    checkType: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    getValue: (first) => _.identity(first),
  },
];

const buildDiffAST = (data1, data2, parentName = '') => _.union(Object.keys(data1), Object.keys(data2))
  .sort()
  .map((key) => {
    const { type, getValue } = _.find(listTypes, (item) => item.checkType(data1, data2, key));
    const value = getValue(data1[key], data2[key], `${parentName}${key}.`, buildDiffAST);

    return {
      name: key, fullName: `${parentName}${key}`, type, value,
    };
  });

const mappingTypeParse = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (file1, file2) => {
  const extensionFile1 = path.extname(file1).slice(1);
  const extensionFile2 = path.extname(file2).slice(1);

  const resultReadFile1 = fs.readFileSync(file1, 'utf8');
  const resultReadFile2 = fs.readFileSync(file2, 'utf8');

  const data1 = mappingTypeParse[extensionFile1](resultReadFile1);
  const data2 = mappingTypeParse[extensionFile2](resultReadFile2);

  return buildDiffAST(data1, data2);
};
