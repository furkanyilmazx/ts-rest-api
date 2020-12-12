import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { TResponseProps, TResult } from './Response.types';

export default class Response<T> {
  readonly page?: string;
  readonly page_size?: string;
  readonly total?: string;
  readonly status: 'success' | 'failure';
  readonly result: TResult;
  readonly error_code?: string;
  readonly error_message?: string;
  readonly system_time: number;
  private readonly _res?: express.Response;
  private _httpStatus: StatusCodes;

  constructor({ pagination, status, res, result, code, message }: TResponseProps<T>) {
    this._httpStatus = status || StatusCodes.OK;
    this.system_time = new Date().getTime();
    this.page = pagination?.page;
    this.page_size = pagination?.pageSize;
    this.total = pagination?.total;
    this.result = result;
    this._res = res;
    this.status = code ? 'failure' : 'success';
    this.error_code = code;
    this.error_message = message;

    Object.defineProperty(this, '_httpStatus', {
      configurable: false,
      writable: false,
      enumerable: false,
    });
  }

  send(res: express.Response) {
    let response = res || this._res;
    console.log('send ~ this._httpStatus', this._httpStatus);
    response.status(this._httpStatus).send(this);
  }
}
