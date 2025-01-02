class Command {
  constructor(instance) {
    if (!instance) {
      throw new Error('command instance must not be null');
    }
    this.program = instance;
    const cmd = this.program.command(this.command);
    cmd.description(this.description);

    cmd.hook('preAction', () => {
      this.preAction();
    });
    cmd.hook('postAction', () => {
      this.postAction();
    });

    if (this.options.length > 0) {
      this.options.forEach((op) => {
        cmd.option(...op);
      });
    }
    cmd.action((...args) => {
      this.action(args);
    });
  }
  get command() {
    throw new Error('command must be implements');
  }
  get description() {
    throw new Error('description must be implements');
  }
  get options() {
    return [['-f,--force', '是否强制初始化', false]];
  }
  action([name, opts]) {
    console.log([name, opts]);
  }
  preAction() {
    console.log('pre');
  }
  postAction() {
    console.log('post');
  }
}

module.exports = Command;
