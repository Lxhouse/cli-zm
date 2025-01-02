const command = require('commander');
const pkg = require('../package.json');
const initCreate = require('@zmcli/init');
const semvar = require('semver');
const { log, isDebug } = require('@zmcli/utils');
const { program } = command;

const LOW_NODE_VERSION = '22.0.0';
function checkNodeVersion() {
  log.verbose('node version', process.version);
  if (semvar.lt(process.version, LOW_NODE_VERSION)) {
    throw new Error(`需要安装 ${LOW_NODE_VERSION} 以上版本的Node.js`);
  }
}
function preAction() {
  checkNodeVersion();
}
module.exports = function (args) {
  log.info(pkg.version);
  program
    .name(Object.getOwnPropertyNames(pkg.bin)[0] || '')
    .usage('<command [options]>')
    .version(pkg.version)
    .option('-d,--debug', '是否启动debug模式', false)
    .hook('preAction', preAction);

  initCreate(program);
  program.parse(process.argv);
};

process.on('uncaughtException', (e) => {
  console.log(isDebug());
  if (isDebug) {
    console.log(e.message);
  } else {
    console.log(e);
  }
});
