/* eslint-disable no-unused-vars */

import express from 'express';
import { Logger } from 'winston';

export type TWinstonLogger = {
  morganStream?: { write: (msg: string) => void };
  child: (args: { module: string }) => Logger;
} & Logger;

export type TCorrelationIdRequest = {
  correlationId?: string;
} & express.Request;
