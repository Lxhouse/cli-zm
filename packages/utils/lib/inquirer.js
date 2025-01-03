import inquirer from 'inquirer';

/**
 * 创建通用的inquirer提示
 * @param {Object} options - 配置选项
 * @param {Array} options.choices - 选项列表(仅在type为list时使用)
 * @param {*} options.defaultValue - 默认值
 * @param {string} options.message - 提示信息
 * @param {string} options.type - 提示类型,默认为list
 * @param {boolean} options.require - 是否必填,默认为true
 * @param {string} options.mask - 密码掩码字符,默认为*
 * @param {Function} options.validate - 验证函数
 * @param {number} options.pageSize - 每页显示的选项数
 * @param {boolean} options.loop - 是否循环选项
 * @returns {Promise} 返回用户选择的值
 */
function make({
  choices,
  defaultValue,
  message = '请选择',
  type = 'list',
  require = true,
  mask = '*',
  validate,
  pageSize,
  loop,
}) {
  const option = {
    name: 'name', // 答案的键名
    default: defaultValue, // 默认值
    message, // 提示信息
    type, // 提示类型
    require, // 是否必填
    mask, // 密码掩码
    validate, // 验证函数
    pageSize, // 分页大小
    loop, // 是否循环
  };
  if (type === 'list') {
    option.choices = choices;
  }

  // 发起提示并返回用户选择的值
  return inquirer.prompt(option).then((res) => res?.name);
}

/**
 * 创建列表选择提示
 * @param {Object} params - 配置参数,与make函数参数相同
 * @returns {Promise} 返回用户选择的值
 */
export function makeList(params) {
  return make({
    ...params,
  });
}
export function makeInput(params) {
  return make({
    ...params,
    type: 'input',
  });
}
