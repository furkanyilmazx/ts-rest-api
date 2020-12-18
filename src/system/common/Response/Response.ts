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
  private _httpStatus: StatusCodes;

  constructor({ pagination, status, result, errorCode, errorMessage }: TResponseProps<T>) {
    this._httpStatus = status || StatusCodes.OK;
    this.system_time = Date.now();
    this.status = errorCode ? 'failure' : 'success';
    this.error_code = errorCode;
    this.error_message = errorMessage;
    this.page = pagination?.page;
    this.page_size = pagination?.pageSize;
    this.total = pagination?.total;
    this.result = result;

    this.makeNotEnumarable('_httpStatus');
  }

  makeNotEnumarable(property: string): void {
    Object.defineProperty(this, property, {
      configurable: false,
      writable: false,
      enumerable: false,
    });
  }

  send(res: express.Response) {
    res.status(this._httpStatus).send(this);
  }
}
