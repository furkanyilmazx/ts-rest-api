import express from 'express';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import { TCorrelationIdRequest } from './logger.types';

import { MORGAN_LOG_FORMAT } from './logger.constants';

import winstonLogger from './logger';

const correlationIdMidlleware: express.RequestHandler = (
  req: TCorrelationIdRequest,
  _: express.Response,
  next: express.NextFunction
) => {
  req.correlationId = uuidv4();
  next();
};

const morganMiddleware: express.RequestHandler = morgan(MORGAN_LOG_FORMAT, {
  stream: winstonLogger.morganStream,
  skip: skipOptionsAndHealthcheckRequests,
});

function skipOptionsAndHealthcheckRequests(req: express.Request) {
  return req.method === 'OPTIONS' || req.url === '/healthcheck';
}

export const loggerMiddleware: express.RequestHandler[] = [
  correlationIdMidlleware,
  morganMiddleware,
];
