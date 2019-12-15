/* eslint no-else-return: 0 */
import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';

export const parseJSON = (file1, file2) => {
  const data1 = JSON.parse(fs.readFileSync(file1));
  const data2 = JSON.parse(fs.readFileSync(file2));

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

export const parseYAML = (file1, file2) => {
  const data1 = yaml.safeLoad(fs.readFileSync(file1));
  const data2 = yaml.safeLoad(fs.readFileSync(file2));

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