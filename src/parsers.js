/* eslint no-else-return: 0 */
/* eslint no-unused-vars: 0 */
import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import renderToString from './renders';

const diffTwoObjects = (data1, data2) => {
  const arr = Object.entries(data1).reduce((acc, [key, value]) => {
    if (_.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return [...acc, `  ${key}: ${value}`];
      } else {
        return [...acc, `- ${key}: ${value}`, `+ ${key}: ${data2[key]}`];
      }
    } else {
      return [...acc, `- ${key}: ${value}`];
    }
  }, ['{']);

  const arr2 = Object.entries(data2)
    .reduce((acc, [key, value]) => (!_.has(data1, key) ? [...acc, `+ ${key}: ${value}`] : acc), arr);

  return `${[...arr2, '}'].join('\n')}`;
};

const buildDiffAST = (data1, data2) => {
  const keys = Object.keys(data1);
  const keys2 = Object.keys(data2);

  return _.union(keys, keys2).sort().map((key) => {
    if (_.has(data2, key) && (data1[key] instanceof Object) && (data2[key] instanceof Object)) {
      return {
        name: key,
        type_: '',
        before: '',
        after: '',
        children: buildDiffAST(data1[key], data2[key]),
      };
    } else {
      const beforeValue = data1[key] === undefined ? '' : data1[key];
      const afterValue = data2[key] === undefined ? '' : data2[key];
      let typeValue = '';

      if (beforeValue === afterValue) {
        typeValue = 'unchanged';
      } else if (beforeValue === '') {
        typeValue = 'added';
      } else if (afterValue === '') {
        typeValue = 'removed';
      } else {
        typeValue = 'changed';
      }

      return {
        name: key, type: typeValue, before: beforeValue, after: afterValue, children: {},
      };
    }
  });
};

export const parseJSON = (file1, file2) => {
  const data1 = JSON.parse(fs.readFileSync(file1));
  const data2 = JSON.parse(fs.readFileSync(file2));

  return renderToString(buildDiffAST(data1, data2));
};

export const parseYAML = (file1, file2) => {
  const data1 = yaml.safeLoad(fs.readFileSync(file1));
  const data2 = yaml.safeLoad(fs.readFileSync(file2));

  return renderToString(buildDiffAST(data1, data2));
};

export const parseINI = (file1, file2) => {
  const data1 = ini.parse(fs.readFileSync(file1, 'utf8'));
  const data2 = ini.parse(fs.readFileSync(file2, 'utf8'));

  return renderToString(buildDiffAST(data1, data2));
};
