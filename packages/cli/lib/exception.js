import { log, isDebug } from '@zmcli/utils';
function printErrorLog(e) {
  if (isDebug()) {
    log.error(e);
  } else {
    log.error(e.message);
  }
}

// 处理未捕获的异常
process.on('uncaughtException', printErrorLog);
// 处理 promise 未捕获的异常
process.on('unhandledRejection', printErrorLog);
