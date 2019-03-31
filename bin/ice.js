#!/usr/bin/env node

'use strict';

const program = require('commander');
const packageInfo = require('../package.json');

console.log(packageInfo.name, packageInfo.version);
program
  .version(packageInfo.version)
  .command('dev', 'start server')
  .command('build', 'build project')
  .command('app', 'build project for app * local files with android or ios(websocket model)')
  .parse(process.argv);

const proc = program.runningCommand;

if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}

const subCmd = program.args[0];
if (!subCmd || (!['dev', 'build', 'app'].includes(subCmd))) {
  program.help();
}
