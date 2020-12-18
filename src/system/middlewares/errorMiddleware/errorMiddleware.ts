import express from 'express';

import BaseError from '@system/common/BaseError';
import Response from '@system/common/Response';

import Logger from '@system/utils/logger';

function errorMiddleware(
  err: Error,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line no-unused-vars
  _next: express.NextFunction
): void {
  const logger = Logger.child({
    module: 'errorMiddleware.js',
  });

  let baseErrorResponse;
  if (err instanceof BaseError) {
    logger.error(`An error occured code: ${err.errorCode}, msg: ${err.errorMessage}`);
    baseErrorResponse = new Response<BaseError>(err);
  } else {
    logger.error('(JS/TS) Unexpected Eror: ' + err.toString());
    baseErrorResponse = new Response<BaseError>(new BaseError('errors.internal'));
  }
  baseErrorResponse.send(res);
}

export default errorMiddleware;
