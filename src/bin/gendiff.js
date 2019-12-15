#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';

commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [ini, json, yaml]', 'Output format file', 'json')
  .arguments('<first> <second>')
  .action((first, second) => {
    console.log(gendiff(first, second, commander.format));
  })
  .parse(process.argv);
