import fs from 'fs';
import gendiff from '../src';

test('gendiff', () => {
  expect(gendiff('./__fixtures__/before.json', './__fixtures__/after.json'))
    .toBe(fs.readFileSync('./__fixtures__/result_ba.txt', 'utf8'));
  expect(gendiff('./__fixtures__/after.json', './__fixtures__/before.json'))
    .toBe(fs.readFileSync('./__fixtures__/result_ab.txt', 'utf8'));
})