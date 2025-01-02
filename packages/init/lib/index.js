const Command = require('@zmcli/command');
const { log } = require('@zmcli/utils');
class InitCommand extends Command {
  get command() {
    return 'init [name]';
  }
  get description() {
    return '初始化命令';
  }
  get options() {
    return [['-f,--force', '是否强制初始化', false]];
  }
  action([name, opts]) {
    log.verbose('init', { name, opts });
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

module.exports = Init;
