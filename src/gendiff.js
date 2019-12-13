import _ from 'lodash';
import fs from 'fs';

export const gendiff = (first, second, format) => {
  //console.log(`first = ${first}, second = ${second}, format = ${format}`);
  const data1 = JSON.parse(fs.readFileSync(first));
  const data2 = JSON.parse(fs.readFileSync(second));

  const arr = Object.entries(data1).reduce((acc, [key, value]) => {
    if (_.has(data2, key)) {
      if (data1[key] === data2[key]) {
       return  [...acc, `  ${key}: ${value}`];
      } else {
        return [...acc, `- ${key}: ${value}`, `+ ${key}: ${data2[key]}`]; 
      }
    } else {
      return [...acc, `- ${key}: ${value}`];
    }
  }, ['{']);

  const arr2 = Object.entries(data2).reduce((acc, [key, value]) => {
    return !_.has(data1, key) ? [...acc, `+  ${key}: ${value}`] : acc;
  }, arr);

  return `${[...arr2, '}'].join('\n')}`;
};

export const readFile = (file) => {
  const obj = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(obj);
  console.log(data.host);
}
