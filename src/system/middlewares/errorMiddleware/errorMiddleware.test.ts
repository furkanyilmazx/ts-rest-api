import express from 'express';

import Logger from '@system/utils/logger';
import BaseError from '@system/common/BaseError';
import Response from '@system/common/Response';

import errorMiddleware from './errorMiddleware';

jest.mock('@system/utils/logger', () => {
  return {
    debug: jest.fn(),
    log: jest.fn(),
    error: jest.fn(),
    child: jest.fn().mockReturnValue({ debug: jest.fn(), log: jest.fn(), error: jest.fn() }),
  };
});

describe('errorMiddleware.test', () => {
  // trying to mock createLogger to return a specific logger instance

  const req = {
    body: {},
    query: {},
    headers: {},
  } as express.Request;
  const res = ({
    send: jest.fn(),
    status: jest.fn(() => res),
    setHeader: jest.fn(() => res),
  } as unknown) as express.Response;
  const next = jest.fn();
  const spySend = jest.spyOn(res, 'send');

  jest.spyOn(Date, 'now').mockImplementation(() => 1479427200000);

  const logChild = Logger.child({ module: 'errorMiddleware.js' });

  const spyChildLoggerErrorLog = jest.spyOn(logChild, 'error');

  afterEach(() => {
    expect(next).toBeCalledTimes(0);
    expect(spyChildLoggerErrorLog).toBeCalledTimes(1);

    next.mockClear();
    spySend.mockClear();
    spyChildLoggerErrorLog.mockClear();
  });

  it('When JS error response with errors.internal 99 code', () => {
    errorMiddleware(new Error('FAKE error'), req, res, next);

    expect(spySend).toBeCalledTimes(1);
    expect(spySend).toBeCalledWith(new Response<BaseError>(new BaseError('errors.internal')));
  });

  it('When bussiness errors.tokenExpire response with errors.tokenExpire', () => {
    errorMiddleware(new BaseError('errors.tokenExpire'), req, res, next);

    expect(spySend).toBeCalledTimes(1);
    expect(spySend).toBeCalledWith(
      new Response<BaseError>(new BaseError('errors.tokenExpire'))
    );
  });
});
