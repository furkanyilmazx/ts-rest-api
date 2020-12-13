import express from 'express';

import BaseError from '@project/common/BaseError';
import Response from '@project/common/Response';

import Logger from '@project/utils/logger';

import { TCorrelationIdRequest } from '@project/types/common';

function errorMiddleware(
  err: Error,
  req: TCorrelationIdRequest,
  res: express.Response,
  // eslint-disable-next-line no-unused-vars
  _next: express.NextFunction
): void {
  const logger = Logger.child({
    module: 'errorMiddleware.js',
    correlationId: req.correlationId,
  });

  let baseErrorResponse;
  if (err instanceof BaseError) {
    logger.error(`An error occured code: ${err.errorCode}, msg: ${err.errorMessage}`);
    baseErrorResponse = new Response<BaseError>({ ...err, correlation_id: req.correlationId });
  } else {
    logger.error('(JS/TS) Unexpected Eror: ' + err.toString());
    baseErrorResponse = new Response<BaseError>({
      ...new BaseError('errors.internal'),
      correlation_id: req.correlationId,
    });
  }
  baseErrorResponse.send(res);
}

export default errorMiddleware;
