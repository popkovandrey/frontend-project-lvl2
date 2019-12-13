#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';

commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [INI, JSON]', 'Output format file', 'JSON')
  .arguments('<first> <second>')
  .action((f, s) => {
    console.log(gendiff(f, s, commander.format));
    // readFile(f);
  })
  .parse(process.argv);
