/* eslint no-undef: 0 */
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
  [`${path}before.json`, `${path}after.json`, 'tree'],
  [`${path}before.yml`, `${path}after.yml`, 'tree'],
  [`${path}before.ini`, `${path}after.ini`, 'tree'],
  [`${path}before.json`, `${path}after.json`, 'plain'],
  [`${path}before.yml`, `${path}after.yml`, 'plain'],
  [`${path}before.ini`, `${path}after.ini`, 'plain'],
  [`${path}before.json`, `${path}after.json`, 'json'],
  [`${path}before.yml`, `${path}after.yml`, 'json'],
  [`${path}before.ini`, `${path}after.ini`, 'json'],
])('gendiff(%s, %s, %s)', (filePath1, filePath2, format) => {
  switch (format) {
    case 'tree':
      expect(gendiff(filePath1, filePath2, format)).toBe(resTreeBeforeAfter);
      break;
    case 'plain':
      expect(gendiff(filePath1, filePath2, format)).toBe(resPlainBeforeAfter);
      break;
    case 'json':
      expect(gendiff(filePath1, filePath2, format)).toBe(resJSONBeforeAfter);
      break;

    default:
      break;
  }
});
