#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';

commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [tree, plain]', 'Output format file', 'tree')
  .arguments('<file1> <file2>')
  .action((file1, file2) => {
    console.log(gendiff(file1, file2, commander.format));
  })
  .parse(process.argv);
