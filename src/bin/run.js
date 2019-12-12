#!/usr/bin/env node
import commander from 'commander';
import gendiff from '../gendiff';

commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [plain, JSON]', 'Output format file', 'plain')
  .arguments('<first> <second>')
  .action((f, s) => {
    gendiff(f, s, commander.format);
  })
  .parse(process.argv);
