import { program } from 'commander';
import path from 'node:path';
import fse from 'fs-extra';
import chalk from 'chalk';
import semvar from 'semver';
import { log } from '@zmcli/utils';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = fse.readJsonSync(pkgPath);
const LOW_NODE_VERSION = '14.0.0';

function checkNodeVersion() {
  log.verbose('node version', process.version);
  if (semvar.lt(process.version, LOW_NODE_VERSION)) {
    throw new Error(chalk.red('需要安装 22.0.0 以上版本的Node.js'));
  }
}

function preAction() {
  checkNodeVersion();
}
export default function createCIL() {
  log.info(pkg.version);
  program
    .name(Object.getOwnPropertyNames(pkg.bin)[0] || '')
    .usage('<command [options]>')
    .version(pkg.version)
    .option('-d,--debug', '是否启动debug模式', false)
    .hook('preAction', preAction);

  program.on('option:debug', () => {
    if (program.opts().debug) {
      log.verbose('debug', 'launch debug mode');
    }
  });
  program.on('command:*', (cmd) => {
    log.error(`${cmd[0]} is not a valid command!`);
    process.exit(1);
  });
  return program;
}
