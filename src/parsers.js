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

const parse = (extensionFile, resultReadFile) => mappingTypeParse[extensionFile](resultReadFile);

export default (filePath1, filePath2) => {
  const resultReadFile1 = fs.readFileSync(filePath1, 'utf8');
  const resultReadFile2 = fs.readFileSync(filePath2, 'utf8');

  const extensionFile1 = path.extname(filePath1).slice(1);
  const extensionFile2 = path.extname(filePath2).slice(1);

  const parsedData1 = parse(extensionFile1, resultReadFile1);
  const parsedData2 = parse(extensionFile2, resultReadFile2);

  return buildDiffAST(parsedData1, parsedData2);
};
