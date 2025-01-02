const isDebug = function () {
  return process.argv.includes('-d') || process.argv.includes('--debug');
};

module.exports = isDebug;
