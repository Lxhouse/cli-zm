const isDebug = function () {
  return process.argv.includes('-d') || process.argv.includes('--debug');
};

export default isDebug;
