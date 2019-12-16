/* eslint no-else-return: 0 */
import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

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

const diff = (data1, data2) => {
  const iter = (obj, path) => {
    return Object.entries(obj).map(([key, value]) => {
      if ((value instanceof Object) && Object.keys(value).length > 1) {
        return {name: key, before: '', after: '',  children: [iter(value, `${path}${key}.`)]}
      } else {
        return {name: key, 
                before: value, 
                after: _.has(data2, `${path}${key}`) ? _.get(data2, `${path}${key}`) : '', 
                children: []}
      }
    })
  }
  console.log(iter(data1, '')[1].children[0]);

};

export const parseJSON = (file1, file2) => {
  const data1 = JSON.parse(fs.readFileSync(file1));
  const data2 = JSON.parse(fs.readFileSync(file2));

  console.log(data1);
  console.log(data2);

  diff(data1, data2);

  return diffTwoObjects(data1, data2);
};

export const parseYAML = (file1, file2) => {
  const data1 = yaml.safeLoad(fs.readFileSync(file1));
  const data2 = yaml.safeLoad(fs.readFileSync(file2));

  return diffTwoObjects(data1, data2);
};

export const parseINI = (file1, file2) => {
  const data1 = ini.parse(fs.readFileSync(file1, 'utf8'));
  const data2 = ini.parse(fs.readFileSync(file2, 'utf8'));

  return diffTwoObjects(data1, data2);
};
