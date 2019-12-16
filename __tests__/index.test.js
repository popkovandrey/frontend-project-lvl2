/* eslint no-undef: 0 */
import fs from 'fs';
import gendiff from '../src';

const path = './__tests__/__fixtures__/';

const resBeforeAfter = fs.readFileSync(`${path}resBeforeAfter.txt`, 'utf8');
const resAfterBefore = fs.readFileSync(`${path}resAfterBefore.txt`, 'utf8');

test.each([
  [`${path}before.json`, `${path}after.json`, 'json', resBeforeAfter],
  [`${path}after.json`, `${path}before.json`, 'json', resAfterBefore],
  [`${path}before.yml`, `${path}after.yml`, 'yaml', resBeforeAfter],
  [`${path}after.yml`, `${path}before.yml`, 'yaml', resAfterBefore],
  [`${path}before.ini`, `${path}after.ini`, 'ini', resBeforeAfter],
  [`${path}after.ini`, `${path}before.ini`, 'ini', resAfterBefore],
])('gendiff(%s, %s, %s)', (a, b, c, expected) => {
  expect(gendiff(a, b, c)).toBe(expected);
});
