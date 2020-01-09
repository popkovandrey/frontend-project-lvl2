import fs from 'fs';
import gendiff from '../src';

const path = './__tests__/__fixtures__/';
let resTreeBeforeAfter;
let resPlainBeforeAfter;
let resJSONBeforeAfter;

beforeEach(() => {
  resTreeBeforeAfter = fs.readFileSync(`${path}resTreeBeforeAfter.txt`, 'utf8');
  resPlainBeforeAfter = fs.readFileSync(`${path}resPlainBeforeAfter.txt`, 'utf8');
  resJSONBeforeAfter = fs.readFileSync(`${path}resBeforeAfter.json`, 'utf8');
});

test.each([
  ['json', 'tree'],
  ['yml', 'tree'],
  ['ini', 'tree'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'plain'],
  ['json', 'json'],
  ['yml', 'json'],
  ['ini', 'json'],
])('gendiff(%s, %s)', (fileExtention, outputFormat) => {
  const mappingFormat = {
    tree: resTreeBeforeAfter,
    plain: resPlainBeforeAfter,
    json: resJSONBeforeAfter,
  };

  expect(gendiff(`${path}before.${fileExtention}`, `${path}after.${fileExtention}`, outputFormat))
    .toBe(mappingFormat[outputFormat]);
});
