#! /usr/bin/env node
import importLocal from 'import-local';
import { log } from '@zmcli/utils';
import entry from '../lib/index.js';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(import.meta.url);
if (importLocal(__dirname)) {
  log.info('cli', '本次使用的版本！');
} else {
  entry(process.argv.slice(2));
}
