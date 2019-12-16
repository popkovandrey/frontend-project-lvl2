import { parseJSON, parseYAML, parseINI } from './parsers';

const mapping = {
  json: parseJSON,
  yaml: parseYAML,
  ini: parseINI,
};

export default (file1, file2, format) => mapping[format](file1, file2);
