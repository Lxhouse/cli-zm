import log from './log.js';
import axios from 'axios';
function getNpmInfo(name) {
  if (!name) return {};
  const registry = 'https://registry.npmmirror.com/';
  // const registry = 'https://registry.npmjs.org/';
  const url = `${registry}${name}`;
  return axios.get(url).then((res) => {
    try {
      return res.data;
    } catch (error) {
      return new Promise.reject(error);
    }
  });
}

export function getLatestVersion(npmName) {
  return getNpmInfo(npmName).then((data) => {
    if (data['dist-tags']?.latest) {
      return data['dist-tags']?.latest;
    } else {
      log.error('无 latest 版本号');
      return Promise.reject(new Error('无 latest 版本号'));
    }
  });
}
