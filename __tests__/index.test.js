/* eslint no-undef: 0 */
import fs from 'fs';
import gendiff from '../src';

const path = './__tests__/__fixtures__/';

const resTreeBeforeAfter = fs.readFileSync(`${path}resTreeBeforeAfter.txt`, 'utf8');
const resTreeAfterBefore = fs.readFileSync(`${path}resTreeAfterBefore.txt`, 'utf8');
const resPlainBeforeAfter = fs.readFileSync(`${path}resPlainBeforeAfter.txt`, 'utf8');
const resPlainAfterBefore = fs.readFileSync(`${path}resPlainAfterBefore.txt`, 'utf8');
const resJSONBeforeAfter = fs.readFileSync(`${path}resBeforeAfter.json`, 'utf8');
const resJSONAfterBefore = fs.readFileSync(`${path}resAfterBefore.json`, 'utf8');

test.each([
  [`${path}before.json`, `${path}after.json`, 'tree', resTreeBeforeAfter],
  [`${path}after.json`, `${path}before.json`, 'tree', resTreeAfterBefore],
  [`${path}before.yml`, `${path}after.yml`, 'tree', resTreeBeforeAfter],
  [`${path}after.yml`, `${path}before.yml`, 'tree', resTreeAfterBefore],
  [`${path}before.ini`, `${path}after.ini`, 'tree', resTreeBeforeAfter],
  [`${path}after.ini`, `${path}before.ini`, 'tree', resTreeAfterBefore],
  [`${path}before.json`, `${path}after.json`, 'plain', resPlainBeforeAfter],
  [`${path}after.json`, `${path}before.json`, 'plain', resPlainAfterBefore],
  [`${path}before.yml`, `${path}after.yml`, 'plain', resPlainBeforeAfter],
  [`${path}after.yml`, `${path}before.yml`, 'plain', resPlainAfterBefore],
  [`${path}before.ini`, `${path}after.ini`, 'plain', resPlainBeforeAfter],
  [`${path}after.ini`, `${path}before.ini`, 'plain', resPlainAfterBefore],
  [`${path}before.json`, `${path}after.json`, 'json', resJSONBeforeAfter],
  [`${path}after.json`, `${path}before.json`, 'json', resJSONAfterBefore],
  [`${path}before.yml`, `${path}after.yml`, 'json', resJSONBeforeAfter],
  [`${path}after.yml`, `${path}before.yml`, 'json', resJSONAfterBefore],
  [`${path}before.ini`, `${path}after.ini`, 'json', resJSONBeforeAfter],
  [`${path}after.ini`, `${path}before.ini`, 'json', resJSONAfterBefore],
])('gendiff(%s, %s, %s)', (a, b, c, expected) => {
  expect(gendiff(a, b, c)).toBe(expected);
});
