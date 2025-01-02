import { program } from 'commander';
import path from 'node:path';
import fse from 'fs-extra';
import initCreate from '@zmcli/init';
import chalk from 'chalk';
import semvar from 'semver';
import { log, isDebug } from '@zmcli/utils';
import { fileURLToPath } from 'node:url';

const LOW_NODE_VERSION = '14.0.0';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename, __dirname);
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = fse.readJsonSync(pkgPath);

function checkNodeVersion() {
  log.verbose('node version', process.version);
  if (semvar.lt(process.version, LOW_NODE_VERSION)) {
    throw new Error(chalk.red('需要安装 22.0.0 以上版本的Node.js'));
  }
}
function preAction() {
  checkNodeVersion();
}
export default function (args) {
  log.info(pkg.version);
  program
    .name(Object.getOwnPropertyNames(pkg.bin)[0] || '')
    .usage('<command [options]>')
    .version(pkg.version)
    .option('-d,--debug', '是否启动debug模式', false)
    .hook('preAction', preAction);

  initCreate(program);
  program.parse(process.argv);
}

process.on('uncaughtException', (e) => {
  console.log(isDebug());
  if (isDebug) {
    console.log(e.message);
  } else {
    console.log(e);
  }
});
