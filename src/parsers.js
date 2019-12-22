import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import buildDiffAST from './diffAST';

const mappingTypeParse = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = (filePath) => {
  const extensionFile = path.extname(filePath).slice(1);

  const resultReadFile = fs.readFileSync(filePath, 'utf8');

  return mappingTypeParse[extensionFile](resultReadFile);
};

export default (filePath1, filePath2) => {
  const parsedData1 = parse(filePath1);
  const parsedData2 = parse(filePath2);

  return buildDiffAST(parsedData1, parsedData2);
};
