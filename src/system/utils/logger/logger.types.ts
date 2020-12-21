/* eslint-disable no-unused-vars */

import { Logger } from 'winston';

export type TLoggerState = {
  type: string;
  message: string;
  className: string;
  pid: number;
  date: number;
};

export type TWinstonLogger = {
  morganStream?: { write: (msg: string) => void };
  child: (args: { module: string }) => Logger;
  mongoLogger?: (message?: string, state?: TLoggerState) => void;
} & Logger;
