import fse from 'fs-extra';
import ora from 'ora';
import { log } from '@zmcli/utils';
import path from 'node:path';
import { pathExistsSync } from 'path-exists';

function getCacheFilePath(targetPath, template) {
  return path.resolve(targetPath, 'node_modules', template.npmName, 'template');
}

function copyFile(targetPath, template, installDir) {
  const originFile = getCacheFilePath(targetPath, template);
  log.verbose('originFile', originFile);
  const fileList = fse.readdirSync(originFile);
  log.verbose('fileList', fileList);
  const spinner = ora('正在拷贝模板文件...').start();
  fileList.forEach((f) =>
    fse.copySync(`${originFile}/${f}`, `${installDir}/${f}`)
  );
  spinner.stop();
  log.notice('模板拷贝成功!');
}

export default function installTemplate(selectTemplate, opts) {
  const { force = false } = opts;
  const { name, targetPath, template } = selectTemplate;
  const rootDir = process.cwd();
  fse.ensureDirSync(targetPath);
  const installDir = path.resolve(`${rootDir}/${name}`);
  if (pathExistsSync(installDir)) {
    if (!force) {
      log.error(`当前目录下已存在 ${installDir} 文件夹`);
    } else {
      fse.removeSync(installDir);
      fse.ensureDirSync(installDir);
    }
  } else {
    fse.ensureDirSync(installDir);
  }
  copyFile(targetPath, template, installDir);
}
