import { log, getLatestVersion, makeInput, makeList } from '@zmcli/utils';
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

const ADD_TYPE = [
  { name: '项目', value: ADD_TYPE_PROJECT },
  { name: '页面', value: ADD_TYPE_PAGE },
];
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
  });
}
function getProject() {
  return makeList({
    choices: ADD_TEMPLATE,
    message: '请选择项目模板',
  });
}
export default async function createTemplate(name, type) {
  //获取创建类型
  const addType = await getAddType();
  log.verbose('addType', { addType });

  if (addType === ADD_TYPE_PROJECT) {
    const projectName = await getProjectName();
    const addTemplate = await getProject();
    const selectTemplate = ADD_TEMPLATE.find((_) => _.value === addTemplate);
    const latestVersion = await getLatestVersion(selectTemplate.npmName);
    log.verbose('latestVersion', latestVersion);
    selectTemplate.version = latestVersion;
    return {
      type: addType,
      name: projectName,
      template: selectTemplate,
    };
  }
}
