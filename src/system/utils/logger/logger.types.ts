/* eslint-disable no-unused-vars */

import { Logger } from 'winston';

export type TWinstonLogger = {
  morganStream?: { write: (msg: string) => void };
  child: (args: { module: string }) => Logger;
} & Logger;
