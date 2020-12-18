import express from 'express';

import Logger from '@system/utils/logger';
import BaseError from '@system/common/BaseError';
import Response from '@system/common/Response';

import errorMiddleware from './errorMiddleware';

describe('errorMiddleware.test', () => {
  const spyLoggerChild = jest.spyOn(Logger, 'child');
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

  afterEach(() => {
    expect(next).toBeCalledTimes(0);
    expect(spyLoggerChild).toBeCalledTimes(1);
    expect(spyLoggerChild).toBeCalledWith({
      module: 'errorMiddleware.js',
    });

    spyLoggerChild.mockClear();
    next.mockClear();
    spySend.mockClear();
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
