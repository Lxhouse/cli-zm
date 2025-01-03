import { homedir } from 'node:os';
import { log, getLatestVersion, makeInput, makeList } from '@zmcli/utils';
import path from 'node:path';
const ADD_TYPE_PROJECT = 'project';
const ADD_TYPE_PAGE = 'page';

const ADD_TEMPLATE = [
  {
    name: 'vue3项目模板',
    value: 'template-vue3',
    npmName: '@zmcli/template-vue3',
    version: '1.0.0',
  },
  {
    name: 'react18项目模板',
    value: 'template-react18',
    npmName: 'template-react1',
    version: '1.0.0',
  },
];

const TEMP_HOME = '/cli-zm';

const ADD_TYPE = [
  { name: '项目', value: ADD_TYPE_PROJECT },
  { name: '页面', value: ADD_TYPE_PAGE },
];

function makeTargetPath() {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, 'addTemplate');
}
function getAddType() {
  return makeList({
    choices: ADD_TYPE,
    message: '请选择创建类型',
    defaultValue: ADD_TYPE_PROJECT,
  });
}
function getProjectName() {
  return makeInput({
    message: '请输入项目名称',
    defaultValue: '',
    validate: (v) => {
      if (v.length > 0) {
        return true;
      } else {
        return '项目名称必须输入';
      }
    },
  });
}
function getProject() {
  return makeList({
    choices: ADD_TEMPLATE,
    message: '请选择项目模板',
  });
}
export default async function createTemplate(name, opt) {
  const { type } = opt;
  const addType = type;
  //获取创建类型
  if (!type) {
    addType = await getAddType();
  }
  if (![ADD_TYPE_PROJECT, ADD_TYPE_PAGE].includes(addType)) {
    throw new Error(`创建的项目类型 ${addType} 不支持`);
  }
  log.verbose('addType', { addType });
  if (addType === ADD_TYPE_PROJECT) {
    const projectName = await getProjectName();
    const addTemplate = await getProject();
    const selectTemplate = ADD_TEMPLATE.find((_) => _.value === addTemplate);
    const latestVersion = await getLatestVersion(selectTemplate.npmName);
    log.verbose('latestVersion', latestVersion);
    selectTemplate.version = latestVersion;
    const targetPath = makeTargetPath();
    return {
      type: addType,
      name: projectName,
      template: selectTemplate,
      targetPath,
    };
  }
}
