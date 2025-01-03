import path from 'node:path';
import { execa } from 'execa';
import fse from 'fs-extra';
import { pathExistsSync } from 'path-exists';
import ora from 'ora';
import { log } from '@zmcli/utils';
function getCacheDir(targetPath) {
  return path.resolve(targetPath, 'node_modules');
}
function makeCacheDir(targetPath) {
  const cacheDir = getCacheDir(targetPath);
  if (!pathExistsSync(cacheDir)) {
    fse.mkdirpSync(cacheDir);
  }
}

async function downloadAddTemplate(targetPath, template) {
  log.verbose('fileurl', targetPath);
  const { npmName, version } = template;
  const installCommand = 'npm';
  const installArgs = ['install', `${npmName}@${version}`];
  const cwd = targetPath;
  await execa(installCommand, installArgs, { cwd });
}
export async function downloadTemplate(selectTemplate) {
  const { template, targetPath } = selectTemplate;
  makeCacheDir(targetPath);
  const spinner = ora('下载模版中...').start();

  try {
    await downloadAddTemplate(targetPath, template);
    spinner.stop();
    log.notice('模板下载成功!');
  } catch (error) {
    spinner.stop();
    log.error(error.message);
  }
}
