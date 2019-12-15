/* eslint no-undef: 0 */
import fs from 'fs';
import gendiff from '../src';

const path = './__tests__/__fixtures__/';

const resBeforeAfter = fs.readFileSync(`${path}resBeforeAfter.txt`, 'utf8');
const resAfterBefore = fs.readFileSync(`${path}resAfterBefore.txt`, 'utf8');

test('gendiff json', () => {
  expect(gendiff(`${path}before.json`, `${path}after.json`, 'json'))
    .toBe(resBeforeAfter);
  expect(gendiff(`${path}after.json`, `${path}before.json`, 'json'))
    .toBe(resAfterBefore);
});

test('gendiff yaml', () => {
  expect(gendiff(`${path}before.yml`, `${path}after.yml`, 'yaml'))
    .toBe(resBeforeAfter);
  expect(gendiff(`${path}after.yml`, `${path}before.yml`, 'yaml'))
    .toBe(resAfterBefore);
});
