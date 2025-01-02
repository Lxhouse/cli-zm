#! /usr/bin/env node
const importLocal = require('import-local');
const { log } = require('@zmcli/utils');
const entry = require('../lib/index');
if (importLocal(__dirname)) {
  log.info('cli', '本次使用的版本！');
} else {
  entry(process.argv.slice(2));
}
