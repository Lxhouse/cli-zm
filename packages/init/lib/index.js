import Command from '@zmcli/command';
import { log } from '@zmcli/utils';

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
    new Promise((resolve) => {
      resolve();
    }).then(() => {
      throw new Error('promise 报错尝试');
    });
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

export default Init;
