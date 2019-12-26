import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters';
import buildDiffAST from './diffAST';

export default (filePath1, filePath2, format) => {
  const resultReadFile1 = fs.readFileSync(filePath1, 'utf8');
  const resultReadFile2 = fs.readFileSync(filePath2, 'utf8');

  const extensionFile1 = path.extname(filePath1).slice(1);
  const extensionFile2 = path.extname(filePath2).slice(1);

  const parsedData1 = parse(extensionFile1, resultReadFile1);
  const parsedData2 = parse(extensionFile2, resultReadFile2);

  return render(buildDiffAST(parsedData1, parsedData2), format);
};
