#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';

commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [tree, plain, json]', 'Output format file', 'tree')
  .arguments('<file1> <file2>')
  .action((filePath1, filePath2) => {
    console.log(gendiff(filePath1, filePath2, commander.format));
  })
  .parse(process.argv);
