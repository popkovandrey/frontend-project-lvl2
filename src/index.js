import { parseJSON, parseYAML } from './parsers';

const mapping = {
  json: parseJSON,
  yaml: parseYAML,
};

export default (file1, file2, format) => mapping[format](file1, file2);

/*
export const readFile = (file) => {
  const obj = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(obj);
  console.log(data.host);
};
*/
