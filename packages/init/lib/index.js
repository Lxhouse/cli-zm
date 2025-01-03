import Command from '@zmcli/command';
import { log } from '@zmcli/utils';
import createTemplate from './createTemplate.js';
import { downloadTemplate } from './downloadTemplate.js';
import installTemplate from './installTemplate.js';
class InitCommand extends Command {
  get command() {
    return 'init [name]';
  }
  get description() {
    return '初始化命令';
  }
  get options() {
    return [
      ['-f,--force', '是否强制初始化', false],
      ['-t,--type <type>', '项目类型(project/page)'],
    ];
  }
  async action([name, opts]) {
    log.verbose('init', { name, opts });

    // new Promise((resolve) => {
    //   resolve();
    // }).then(() => {
    //   throw new Error('promise 报错尝试');
    // });
    // 1. 选择项目模板，生成项目信息
    // 2. 下载项目模板到缓存目录
    // 3. 安装项目模板到项目目录
    const template = await createTemplate(name, opts);
    log.verbose('template', template);
    await downloadTemplate(template);
    installTemplate(template, opts);
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

export default Init;
