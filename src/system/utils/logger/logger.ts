import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

import CONFIG from '@system/configs';

import { TWinstonLogger } from './logger.types';

const { API_NAME, API_ENV, LOG } = CONFIG;
const { combine, timestamp, printf } = format;

const logFormatPrintf = printf(
  ({
    level,
    message,
    timestamp,
    serviceName,
    module: moduleName,
    moduleDefault,
    correlationId,
  }) =>
    `${timestamp} ${level} [${serviceName},${
      CONFIG.ASYNC_STORAGE.getStore()?.correlationId || correlationId || ''
    }] [${moduleName || moduleDefault}]: ${message}`
);

const dailyRoateTransformer = new transports.DailyRotateFile({
  filename: `${API_NAME}.log_%DATE%`,
  zippedArchive: true,
  dirname: LOG.FILE_PATH,
  createSymlink: true,
  symlinkName: `${API_NAME}.log`,
});

const winstonLogger: TWinstonLogger = createLogger({
  level: API_ENV == 'local' ? 'debug' : 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }), logFormatPrintf),
  defaultMeta: {
    serviceName: API_NAME,
    moduleDefault: '',
  },
  transports: [dailyRoateTransformer],
});

if (API_ENV === 'local') {
  winstonLogger.add(
    new transports.Console({
      format: combine(timestamp(), logFormatPrintf),
    })
  );
}

winstonLogger.morganStream = {
  write: function (message) {
    winstonLogger.info(message.substring(0, message.lastIndexOf('\n')), {
      module: 'logger.js',
    });
  },
};

export default winstonLogger;
